import { ASTNode, MARK_TYPE, MarkType, RenderablePlugin } from "../types";

export function renderNode(node: ASTNode, plugins: Map<MarkType, RenderablePlugin>): string {
    if (node.type === MARK_TYPE.TEXT) {
        return node.content;
    }
    const plugin = plugins.get(node.type as MarkType);
    if (!plugin) {
        throw new Error(`No render plugin for type: ${node.type}`);
    }
    return plugin.render(node);
}

export function renderChildren(
    nodes: ASTNode[] | undefined,
    plugins: Map<MarkType, RenderablePlugin>
): string {
    if (!nodes?.length) return "";
    return nodes.map((n) => renderNode(n, plugins)).join("");
}
