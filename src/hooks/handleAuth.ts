import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { Remult, remult, type UserInfo } from 'remult';
import { Role } from '../shared/Role';
import { User } from '../shared/user';
import { dataProvider, handleRemult } from './handleRemult';
import type { Handle } from '@sveltejs/kit';

//Based on article at https://authjs.dev/reference/sveltekit
export const handleAuth: Handle = SvelteKitAuth({
	trustHost: true,
	providers: [
		Credentials({
			credentials: {
				name: {
					placeholder: 'Log with your name'
				}
			},
			authorize: async (info, request) => {
				const res = await handleRemult.withRemult({ request } as any, async () => {
					let user = await remult.repo(User).findFirst({ name: [String(info.name)] });

					if (!user) {
						user = await remult.repo(User).insert({ name: String(info.name) });
					}

					return taint(user);
				});

				return res;
			}
		})
	],
	callbacks: {
		session: async ({ session, token }) => {
			const remult = new Remult(await dataProvider());
			let user = await remult.repo(User).findFirst({ id: [String(token?.sub)] });
			return {
				...session,
				user: taint(user)!
			};
		}
	}
});
export const taint = (user?: User): UserInfo | null => {
	if (!user) {
		return null;
	}
	return {
		id: user.id,
		name: user.name,
		roles: user.name === 'Admin' ? [Role.ADMIN] : user.name === 'Manager' ? [Role.MANAGER] : []
	};
};
