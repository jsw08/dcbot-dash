import { error, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
import { checkUser } from '$lib/auth';

const authorizationHandle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname !== '/' && !checkUser(await event.locals.auth()))
		throw error(401, 'Incorrect permissions. Please sign in as an authorised user.');

	return resolve(event);
};

export const handle: Handle = sequence(authenticationHandle, authorizationHandle);
