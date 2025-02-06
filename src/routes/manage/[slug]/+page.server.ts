import { readdir } from "node:fs/promises"
import {join, isAbsolute, resolve} from "node:path"
import type { Image } from "$lib/image";
import { SEXYURL} from "$env/static/private"
import { error } from "@sveltejs/kit";
import { SEXY_DIR } from "$lib/dirs.js";


export async function load({params, url}): Promise<{user: string, images: Image[]}> {
    const user = params.slug;
    console.log(SEXY_DIR)
    const userDirPath = join(SEXY_DIR, params.slug);
    console.log(userDirPath)

    let images: string[] = []
    try {
        images = await readdir(userDirPath)
    } catch {
        return error(404, {message: "Sexy mf not found."})
    }

    const baseurl = SEXYURL.startsWith("/") ? new URL(SEXYURL, url.origin) : new URL(SEXYURL);
    return {user, images: images.map(v => ({name: v, thumbnail: new URL(`${user}/${v}`, baseurl).toString()}))}
}