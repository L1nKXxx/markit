import { ASTNode, InlinePlugin, MARK_TYPE, Token } from "../types";

/**
 * 扫描一段字符串，按 inlinePlugins 顺序匹配行内语法。
 * 未命中时收集为 TEXT 节点。
 */
export function parseInline(text: string, plugins: InlinePlugin[]): ASTNode[] {
    const nodes: ASTNode[] = [];
    let pos = 0;

    while (pos < text.length) {
        let matched = false;

        for (const plugin of plugins) {
            const result = plugin.match(text, pos);
            if (!result) continue;

            const token: Token = {
                type: plugin.name,
                raw: result.raw,
                content: result.content,
            };
            nodes.push(plugin.parse(token));
            pos = result.endPos;
            matched = true;
            break;
        }

        if (matched) continue;

        // 收集连续普通字符，直到下一个可能的标记起点
        let end = pos + 1;
        while (end < text.length && !mightBeInlineStart(text, end, plugins)) {
            end++;
        }
        nodes.push({ type: MARK_TYPE.TEXT, content: text.slice(pos, end) });
        pos = end;
    }

    return nodes;
}

/** 判断 pos 处是否可能是某个行内插件的起点 */
function mightBeInlineStart(
    text: string,
    pos: number,
    plugins: InlinePlugin[]
): boolean {
    return plugins.some(p => p.match(text, pos) !== null);
}