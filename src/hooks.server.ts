import { error, type Handle } from '@sveltejs/kit';
import { handle as authenticationHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';
import { AUTH_USER_EMAIL} from '$env/static/private';
 
const authorizationHandle: Handle = async ({ event, resolve }) => {
  if (event.url.pathname !== '/') {
    const session = await event.locals.auth();
    if (!session || session?.user?.email !== AUTH_USER_EMAIL) {
        throw error(401, "Incorrect permissions. Please sign in as an authorised user.")
    }
  }
  return resolve(event);
}
 
export const handle: Handle = sequence(authenticationHandle, authorizationHandle)
