import "./syntax";

import { blockLexer } from "./core/block-lexer";
import { parseBlocks } from "./core/parser";
import { renderDocument } from "./core/renderer";
import { getBlockPlugins, getRenderPlugins } from "./core/plugins";

export { blockPlugins, inlinePlugins, pluginMap } from "./syntax";
export type {
    ASTNode,
    BlockPlugin,
    InlineMatch,
    InlinePlugin,
    MarkType,
    RenderablePlugin,
    Token,
} from "./types";
export { MARK_TYPE } from "./types";
export {
    blockLexer,
    parseInline,
    parseBlocks,
    renderNode,
    renderChildren,
    renderDocument,
} from "./core";

/** 将 Markdown 字符串解析并渲染为 HTML */
export function markit(md: string): string {
    const lines = md.split("\n");
    const tokens = blockLexer(lines, getBlockPlugins());
    const ast = parseBlocks(tokens, getBlockPlugins());
    return renderDocument(ast, getRenderPlugins());
}
