import { InlinePlugin } from "../../types";
import { boldPlugin } from "./bold";
// import { italicPlugin } from "./italic";
// import { linkPlugin } from "./link";

export { boldPlugin } from "./bold";

/** 行内插件注册表；inline-parser 按顺序匹配，先匹配先赢 */
export const inlinePlugins: InlinePlugin[] = [
    boldPlugin,
    // italicPlugin,
    // linkPlugin,
];
