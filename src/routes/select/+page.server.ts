import { readdir } from "node:fs/promises"
import {join,} from "node:path"
import type { Image } from "../../lib/image.js";
import { SEXYURL} from "$env/static/private"
import { SEXY_DIR } from "$lib/dirs.js";

export async function load({params, url}): Promise<{images: Image[]}>  {
    const baseurl = SEXYURL.startsWith("/") ? new URL(SEXYURL, url.origin) : new URL(SEXYURL);

    const dirs = (await readdir(SEXY_DIR, {withFileTypes: true})).filter(v => v.isDirectory());
    const images: Image[] = await Promise.all(dirs.map(dir => {
        return readdir(join(dir.parentPath, dir.name)).then(v => {
            return {name: dir.name, thumbnail: new URL(`${dir.name}/${v[0]}`, baseurl).toString()}
        })
    }))

    return {images}
}