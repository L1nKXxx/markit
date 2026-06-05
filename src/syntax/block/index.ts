import { BlockPlugin } from "../../types";
import { headingPlugin } from "./heading";
// import { listPlugin } from "./list";
// import { paragraphPlugin } from "./paragraph";

export { headingPlugin } from "./heading";

/** 块级插件注册表；lexer 按顺序匹配，先匹配先赢；兜底插件（如 paragraph）放最后 */
export const blockPlugins: BlockPlugin[] = [
    headingPlugin,
    // listPlugin,
    // paragraphPlugin,
];
