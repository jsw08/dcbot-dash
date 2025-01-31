import { readdir } from "node:fs/promises"
import {join} from "node:path"

const SEXY_DIR = join(import.meta.dirname, "../../../static/sexy/");

export async function load({params}) {
    const dirs = (await readdir(SEXY_DIR, {withFileTypes: true})).filter(v => v.isDirectory());
    const images: ({name: string, thumbnail: string | undefined})[] = await Promise.all(dirs.map(dir => {
        return readdir(join(dir.parentPath, dir.name)).then(v => {
            return {name: dir.name, thumbnail: v[0]}
        })
    }))

    return {images}
}