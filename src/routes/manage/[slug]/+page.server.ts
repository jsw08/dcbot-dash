import { error } from "@sveltejs/kit";
import { readdir } from "node:fs/promises"
import { join } from "node:path"

const SEXY_DIR = join(import.meta.dirname, "../../../../static/sexy/");

export async function load({params}) {
    const user = params.slug;
    const userDirPath = join(SEXY_DIR, params.slug);

    let images: string[] = []
    try {
        images = await readdir(userDirPath)
    } catch {
        return error(404, {message: "Sexy mf not found."})
    }

    return {user, images}
}