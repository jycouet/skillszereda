import { remultSveltekit } from 'remult/remult-sveltekit';

import { DATABASE_URL } from '$env/static/private';
import { remult, type UserInfo } from 'remult';
import { createPostgresDataProvider } from 'remult/postgres';
import { Question } from '../shared/question';

export const handleRemult = remultSveltekit({
	entities: [Question],
	dataProvider: createPostgresDataProvider({
		connectionString: DATABASE_URL
	}),
	// controllers: [TasksController],
	getUser: async (event) => (await event?.locals?.getSession())?.user as UserInfo,
	initApi: async () => {
		const repo = remult.repo(Question);
		const q = repo.findFirst();
	}
});
