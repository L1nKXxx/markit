import { BlockPlugin, InlinePlugin, MarkType, RenderablePlugin } from "../types";

interface PluginRegistry {
    block: BlockPlugin[];
    inline: InlinePlugin[];
    render: Map<MarkType, RenderablePlugin>;
}

let registry: PluginRegistry | null = null;

/** 初始化插件注册表，在 syntax/index.ts 加载时调用一次 */
export function initPlugins(opts: {
    blockPlugins: BlockPlugin[];
    inlinePlugins: InlinePlugin[];
    pluginMap: Map<MarkType, RenderablePlugin>;
}): void {
    registry = {
        block: opts.blockPlugins,
        inline: opts.inlinePlugins,
        render: opts.pluginMap,
    };
}

export function getBlockPlugins(): BlockPlugin[] {
    if (!registry) {
        throw new Error("Plugins not initialized. Import './syntax' first.");
    }
    return registry.block;
}

export function getInlinePlugins(): InlinePlugin[] {
    if (!registry) {
        throw new Error("Plugins not initialized. Import './syntax' first.");
    }
    return registry.inline;
}

export function getRenderPlugins(): Map<MarkType, RenderablePlugin> {
    if (!registry) {
        throw new Error("Plugins not initialized. Import './syntax' first.");
    }
    return registry.render;
}

/** 合并块级与行内插件，构建渲染查找表 */
export function buildPluginMap(
    blockPlugins: BlockPlugin[],
    inlinePlugins: InlinePlugin[]
): Map<MarkType, RenderablePlugin> {
    return new Map<MarkType, RenderablePlugin>(
        [...blockPlugins, ...inlinePlugins].map(
            (p): [MarkType, RenderablePlugin] => [p.name, p]
        )
    );
}
