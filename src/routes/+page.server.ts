import { readdir } from "node:fs/promises"
import {join,} from "node:path"
import { SEXYURL} from "$env/static/private"
import { SEXY_DIR } from "$lib/dirs.js";

export async function load({params, url}): Promise<{isOwner: boolean}>  {
    return {isOwner: true}
}