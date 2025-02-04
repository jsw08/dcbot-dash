import { readdir } from "node:fs/promises"
import {join} from "node:path"
import type { Image } from "../../image.js";
import {BASEURL} from "$env/static/private"

const SEXY_DIR = join(import.meta.dirname, "../../../static/sexy/");

export async function load({params, url}): {images: Image[]}  {
    const baseURL = 
    const dirs = (await readdir(SEXY_DIR, {withFileTypes: true})).filter(v => v.isDirectory());
    const images: Image[][] = await Promise.all(dirs.map(dir => {
        return readdir(join(dir.parentPath, dir.name)).then(v => {
            return {name: dir.name, thumbnail: v[0]}
        })
    }))

    return {images}
}