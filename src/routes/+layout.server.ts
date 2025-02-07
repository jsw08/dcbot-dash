import type { LayoutServerLoad } from './$types';
import { checkUser } from '$lib/auth';
import { readdir } from 'fs/promises';
import { SEXY_DIR } from '$lib/dirs';
import type { Session } from '@auth/sveltekit';

export const load: LayoutServerLoad = async (event): Promise<{
  session: Session | null,
  users?: string[]
}> => {
	const session = await event.locals.auth();

	return {
		session,
		users: !checkUser(session)
			? undefined
			: (await readdir(SEXY_DIR, { withFileTypes: true })).reduce<string[]>(
					(old, value) => [...old, ...(value.isDirectory() ? [value.name] : [])],
					[]
				)
	};
};
