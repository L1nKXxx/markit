export const MARK_TYPE = {
    HEADING: "heading",
    PARAGRAPH: "paragraph",
    BOLD: "bold",
    ITALIC: "italic",
    LINK: "link",
    IMAGE: "image",
    LIST: "list",
    TEXT: "text",
} as const;

export type MarkType = (typeof MARK_TYPE)[keyof typeof MARK_TYPE];

export interface InlineMatch {
    raw: string; // 原文中匹配到的完整片段
    content: string; // 去掉标记后的核心文字（bold 时即加粗内容）
    endPos: number; // 下一个未处理字符的下标
}

export interface BlockPlugin extends RenderablePlugin {
    tokenize: (lines: string[], index: number) => { token: Token; linesConsumed: number } | null;
    parse: (token: Token) => ASTNode;
}
// 3. 行内插件 = 匹配 + 解析 + 渲染
export interface InlinePlugin extends RenderablePlugin {
    match: (text: string, pos: number) => InlineMatch | null; // 见下文
    parse: (token: Token) => ASTNode;
}
export interface RenderablePlugin {
    name: MarkType;
    render: (node: ASTNode) => string;
}

export interface Token {
    type: MarkType;
    raw: string;
    content: string;
    depth?: number; //heading的层级
    lang?: string; // code block的语言
    href?: string; // link的href
    title?: string; // link的title
    alt?: string; // image的alt
    src?: string; // image的src
}

export interface ASTNode {
    type: MarkType;
    content: string;
    depth?: number; //heading的层级
    children?: ASTNode[];
}
