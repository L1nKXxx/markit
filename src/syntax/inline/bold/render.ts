import { ASTNode, MARK_TYPE } from "../../../types";
import { renderChildren } from "../../../core/render-node";
import { getRenderPlugins } from "../../../core/plugins";

export function render(node: ASTNode): string {
    if (node.type !== MARK_TYPE.BOLD) {
        throw new Error(`Expected bold node, got ${node.type}`);
    }

    const inner = node.children
        ? renderChildren(node.children, getRenderPlugins())
        : node.content;

    return `<strong>${inner}</strong>`;
}
