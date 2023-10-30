import { SvelteKitAuth } from '@auth/sveltekit';
import Credentials from '@auth/core/providers/credentials';
import type { UserInfo } from 'remult';
import { Role } from '../shared/Role';

const validUsers: UserInfo[] = [
	{ id: 'admin', name: 'Admin', roles: [Role.ADMIN] },
	{ id: 'manager', name: 'Manager', roles: [Role.MANAGER] },
	{ id: 'me', name: 'Me' }
];

//Based on article at https://authjs.dev/reference/sveltekit
export const handleAuth = SvelteKitAuth({
	trustHost: true,
	providers: [
		Credentials({
			credentials: {
				name: {
					placeholder: 'Try Me or Manager or Admin'
				}
			},
			authorize: (info) => validUsers.find((user) => user.name === info?.name) || null
		})
	],
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			user: validUsers.find((user) => user.id === token?.sub)
		})
	}
});
