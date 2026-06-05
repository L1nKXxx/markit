import { ASTNode, BlockPlugin, Token } from "../types";

/** 块级语法分析：将 Token 列表转为 AST */
export function parseBlocks(tokens: Token[], plugins: BlockPlugin[]): ASTNode[] {
    const pluginByType = new Map(plugins.map((p) => [p.name, p]));

    return tokens.map((token) => {
        const plugin = pluginByType.get(token.type);
        if (!plugin) {
            throw new Error(`No block plugin for token type: ${token.type}`);
        }
        return plugin.parse(token);
    });
}
