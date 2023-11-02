import Credentials from '@auth/core/providers/credentials';
import { SvelteKitAuth } from '@auth/sveltekit';
import { Remult, type UserInfo } from 'remult';
import { Role } from '../shared/Role';
import { User } from '../shared/user';
import { dataProvider } from './handleRemult';

//Based on article at https://authjs.dev/reference/sveltekit
export const handleAuth = SvelteKitAuth({
	providers: [
		Credentials({
			credentials: {
				name: {
					placeholder: 'Log with your name'
				}
			},
			authorize: async (info) => {
				const remult = new Remult(await dataProvider());
				let user = await remult.repo(User).findFirst({ name: [String(info.name)] });
				if (!user) {
					user = await remult.repo(User).insert({ name: String(info.name) });
				}

				return taint(user);
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
