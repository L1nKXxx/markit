import { BlockPlugin, Token } from "../types";

/**
 * 块级词法分析：按行扫描，遍历 blockPlugins 尝试 tokenize。
 * 未匹配的行当前跳过；加入 paragraph 兜底插件后可消费所有行。
 */
export function blockLexer(lines: string[], plugins: BlockPlugin[]): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < lines.length) {
        let matched = false;

        for (const plugin of plugins) {
            const result = plugin.tokenize(lines, i);
            if (!result) continue;

            tokens.push(result.token);
            i += result.linesConsumed;
            matched = true;
            break;
        }

        if (!matched) {
            i++;
        }
    }

    return tokens;
}
