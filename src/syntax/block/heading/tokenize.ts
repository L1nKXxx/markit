import { MARK_TYPE, Token } from "../../../types";

const HEADING = /^ *(#{1,6}) +([^\n]+?) *#* *$/;

export function tokenize(lines: string[], index: number) {
    const line = lines[index];
    const match = HEADING.exec(line);
    if (!match) return null;

    const token: Token = {
        type: MARK_TYPE.HEADING,
        raw: line,
        content: match[2].trim(),
        depth: match[1].length,
    };

    return { token, linesConsumed: 1 };
}
