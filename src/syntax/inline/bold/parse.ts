import { ASTNode, MARK_TYPE, Token } from "../../../types";

export function parse(token: Token): ASTNode {
    if (token.type !== MARK_TYPE.BOLD) {
        throw new Error(`Expected bold token, got ${token.type}`);
    }

    // 第一版：bold 内容当作纯文本；以后可在此递归 parseInline 支持嵌套
    return {
        type: MARK_TYPE.BOLD,
        content: "",
        children: [{ type: MARK_TYPE.TEXT, content: token.content }],
    };
}