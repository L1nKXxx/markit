import { MARK_TYPE, BlockPlugin } from "../../../types";
import { tokenize } from "./tokenize";
import { parse } from "./parse";
import { render } from "./render";

export const headingPlugin: BlockPlugin = {
    name: MARK_TYPE.HEADING,
    tokenize,
    parse,
    render,
};
