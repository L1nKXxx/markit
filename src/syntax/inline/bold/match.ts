import { InlineMatch } from "../../../types";

// 第一版：只支持 **text**，中间不能含 * 或换行
const BOLD = /^\*\*([^*\n]+?)\*\*/;

export function match(text: string, pos: number): InlineMatch | null {
    const slice = text.slice(pos);
    const m = BOLD.exec(slice);
    if (!m) return null;

    const raw = m[0];
    return {
        raw,
        content: m[1],
        endPos: pos + raw.length,
    };
}