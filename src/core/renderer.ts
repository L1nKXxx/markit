import { ASTNode, MarkType, RenderablePlugin } from "../types";
import { renderNode } from "./render-node";

/** 将 AST 文档渲染为 HTML 字符串 */
export function renderDocument(
    nodes: ASTNode[],
    plugins: Map<MarkType, RenderablePlugin>
): string {
    return nodes.map(node => renderNode(node, plugins)).join("\n");
}
