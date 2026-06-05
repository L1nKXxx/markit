import { ASTNode, MARK_TYPE } from "../../../types";
import { renderChildren } from "../../../core/render-node";
import { getRenderPlugins } from "../../../core/plugins";

export function render(node: ASTNode): string {
    if (node.type !== MARK_TYPE.HEADING) {
        throw new Error(`Expected heading node, got ${node.type}`);
    }

    const depth = node.depth ?? 1;
    const tag = `h${Math.min(depth, 6)}`;

    const inner = node.children ? renderChildren(node.children, getRenderPlugins()) : node.content;

    return `<${tag}>${inner}</${tag}>`;
}
