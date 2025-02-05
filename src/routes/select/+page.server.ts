import { readdir } from "node:fs/promises"
import {join, isAbsolute, resolve} from "node:path"
import type { Image } from "../../lib/image.js";
import {SEXYDIR, SEXYURL} from "$env/static/private"

const SEXY_DIR = isAbsolute(SEXYDIR) ? SEXYDIR : resolve(join(import.meta.dirname, "../../..", SEXYDIR));

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