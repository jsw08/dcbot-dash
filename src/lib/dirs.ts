import { SEXYDIR } from "$env/static/private";
import { isAbsolute, join, resolve } from "path";

export const SEXY_DIR = isAbsolute(SEXYDIR) ? SEXYDIR : resolve(join(import.meta.dirname, "../../", SEXYDIR));