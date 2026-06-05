import { MARK_TYPE, InlinePlugin } from "../../../types";
import { match } from "./match";
import { parse } from "./parse";
import { render } from "./render";

export const boldPlugin: InlinePlugin = {
    name: MARK_TYPE.BOLD,
    match,
    parse,
    render,
};
