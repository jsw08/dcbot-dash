import { SEXY_DIR } from '$lib/dirs.js';
import { error } from '@sveltejs/kit';
import { access, rm, rename } from 'node:fs/promises';
import { join } from 'node:path';

export async function DELETE({ params }) {
	const user = params.user;
    const image = params.image
	const imagePath = join(SEXY_DIR, user, image);

    try {
        await access(imagePath)
    } catch {
        return error(404, {message: "Sexy mf or image not found."})
    }

	rm(imagePath)
	return new Response(null, { status: 204 });
}
export async function POST({params, request}) {
    const user = params.user;
    const image = params.image;
    const newImage = await request.text()

    const imagePath = join(SEXY_DIR, user, image)
    const newImagePath = join(SEXY_DIR, user, newImage)

    if (newImage.includes("/")) {
        return new Response( "Image already exists.", {status: 406})
    }

    try {
        await access(imagePath)
    } catch {
        return new Response( "Sexy mf or image not found.", {status: 404})
    }

    try {
        await access(newImagePath)
        return new Response( "Image already exists.", {status: 406})
    } catch (e) {
        console.log(e)
    }

    try {
        await rename(imagePath, newImagePath)
    } catch {
        return new Response( "Something went wrong while renaming.", {status: 500})
    }

    return new Response(null, {status: 204})
}