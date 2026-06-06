import { Token, ASTNode, MARK_TYPE } from "../../../types";
import { parseInline } from "../../../core/inline-parser";
import { getInlinePlugins } from "../../../core/plugins";

export function parse(token: Token): ASTNode {
    if (token.type !== MARK_TYPE.PARAGRAPH) {
        throw new Error(`Expected paragraph token, got ${token.type}`);
    }

    const children = parseInline(token.content, getInlinePlugins());
    const isPlainText =
        children.length === 1 &&
        children[0].type === MARK_TYPE.TEXT &&
        children[0].content === token.content;

    return {
        type: MARK_TYPE.PARAGRAPH,
        content: isPlainText ? token.content : "",
        ...(isPlainText ? {} : { children }),
    };
}
