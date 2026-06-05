import { buildPluginMap, initPlugins } from "../core/plugins";
import { blockPlugins } from "./block";
import { inlinePlugins } from "./inline";

export { blockPlugins } from "./block";
export { inlinePlugins } from "./inline";

/** 合并块级与行内插件，供 renderer 按 node.type 查找 */
export const pluginMap = buildPluginMap(blockPlugins, inlinePlugins);

initPlugins({ blockPlugins, inlinePlugins, pluginMap });
