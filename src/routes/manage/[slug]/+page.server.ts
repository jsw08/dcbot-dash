import { readdir } from "node:fs/promises"
import {join, isAbsolute, resolve} from "node:path"
import type { Image } from "$lib/image";
import {SEXYDIR, SEXYURL} from "$env/static/private"
import { error } from "@sveltejs/kit";

const SEXY_DIR = isAbsolute(SEXYDIR) ? SEXYDIR : resolve(join(import.meta.dirname, "../../../..", SEXYDIR));

export async function load({params, url}): Promise<{user: string, images: Image[]}> {
    const user = params.slug;
    const userDirPath = join(SEXY_DIR, params.slug);

    let images: string[] = []
    try {
        console.log(userDirPath)
        images = await readdir(userDirPath)
    } catch {
        return error(404, {message: "Sexy mf not found."})
    }

    const baseurl = SEXYURL.startsWith("/") ? new URL(SEXYURL, url.origin) : new URL(SEXYURL);
    return {user, images: images.map(v => ({name: v, thumbnail: new URL(`${user}/${v}`, baseurl).toString()}))}
}