import { remultSveltekit } from 'remult/remult-sveltekit';

import { DATABASE_URL } from '$env/static/private';
import { remult, type UserInfo } from 'remult';
import { createPostgresDataProvider } from 'remult/postgres';
import { Question } from '../shared/question';

export const handleRemult = remultSveltekit({
	logApiEndPoints: false,
	entities: [Question],
	dataProvider:
		DATABASE_URL && DATABASE_URL !== ''
			? createPostgresDataProvider({
					connectionString: DATABASE_URL
			  })
			: undefined,
	getUser: async (event) => (await event?.locals?.getSession())?.user as UserInfo,
	initApi: async () => {
		// const repo = remult.repo(Question);
		// const q = repo.findFirst();
	}
});
