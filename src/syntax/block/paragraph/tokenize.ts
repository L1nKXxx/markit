import { MARK_TYPE, Token } from "../../../types";

/** 兜底：消费连续非空行作为一个段落 */
export function tokenize(lines: string[], index: number) {
    if (!lines[index].trim()) return null;

    const collected: string[] = [];
    let i = index;
    while (i < lines.length && lines[i].trim()) {
        collected.push(lines[i]);
        i++;
    }

    const content = collected.join("\n");
    const token: Token = {
        type: MARK_TYPE.PARAGRAPH,
        raw: content,
        content,
    };

    return { token, linesConsumed: collected.length };
}
