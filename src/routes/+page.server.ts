import { readdir } from 'node:fs/promises';
import { SEXY_DIR } from '$lib/dirs.js';
import { checkUser } from '$lib/auth.js';

export async function load({ locals, params, url }): Promise<{ users?: string[] }> {
	if (checkUser(await locals.auth()))
		return {
			users: (await readdir(SEXY_DIR, { withFileTypes: true })).reduce<string[]>(
				(o, v) => [...o, ...(v.isDirectory() ? [v.name] : [])],
				[]
			)
		};
	return {};
}
