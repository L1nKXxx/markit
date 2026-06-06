import { MARK_TYPE, BlockPlugin } from "../../../types";
import { tokenize } from "./tokenize";
import { parse } from "./parse";
import { render } from "./render";

export const paragraphPlugin: BlockPlugin = {
    name: MARK_TYPE.PARAGRAPH,
    tokenize,
    parse,
    render,
};
