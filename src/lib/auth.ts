import { AUTH_USER_EMAIL } from "$env/static/private";
import type { Session } from "@auth/sveltekit";

export const checkUser = (session: Session | null) => {console.log(session?.user?.email === AUTH_USER_EMAIL); return session?.user?.email === AUTH_USER_EMAIL}
