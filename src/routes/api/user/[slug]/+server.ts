import { SEXY_DIR } from '$lib/dirs.js';
import { error } from '@sveltejs/kit';
import { access, rm, rename } from 'node:fs/promises';
import { join } from 'node:path';

export async function DELETE({ params }) {
	const user = params.slug;
	const userDirPath = join(SEXY_DIR, params.slug);

    try {
        await access(`${userDirPath}/`)
    } catch {
        return error(404, {message: "Sexy mf not found."})
    }

	rm(userDirPath, {recursive: true})

	return new Response(null, { status: 204 });
}
export async function POST({params, request}) {
    const user = params.slug;
    const newUser = await request.text()

	const userDirPath = join(SEXY_DIR, user);
	const newUserDirPath = join(SEXY_DIR, newUser);

    if (newUser.includes("/") || newUser.includes(".")) {
        return new Response("Invalid sexy name.", {status: 406})
    }

    try {
        await access(`${userDirPath}/`)
    } catch {
        return new Response("Sexy mf not found.", {status: 404})
    }

    try {
        await access(`${newUserDirPath}/`)
        return new Response("Sexy mf already exists.", {status: 406})
    } catch {
    }

    try {
        await rename(userDirPath, newUserDirPath)
    } catch {
        return new Response("Something went wrong while renaming.", {status: 500})
    }

    return new Response(null, {status: 204})
}