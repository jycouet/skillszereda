import { remultSveltekit } from 'remult/remult-sveltekit';

import { DATABASE_URL } from '$env/static/private';
import { remult, SqlDatabase, type UserInfo } from 'remult';
import { createPostgresDataProvider } from 'remult/postgres';
import { Question } from '../shared/question';
import { User } from '../shared/user';
import { QuestionInAssessement } from '../shared/questionsInAssessement';
import { Assessment } from '../shared/assessment';
import { AssessmentController } from '../shared/assessmentController';
import { JsonFileDataProvider } from 'remult/server';
import { taint } from './handleAuth';

SqlDatabase.LogToConsole = 'oneLiner';
export const dataProvider = async () =>
	DATABASE_URL && DATABASE_URL !== ''
		? createPostgresDataProvider({
				connectionString: DATABASE_URL
		  })
		: new JsonFileDataProvider('./db');

export const handleRemult = remultSveltekit({
	logApiEndPoints: false,
	entities: [Question, User, QuestionInAssessement, Assessment],
	controllers: [AssessmentController],
	dataProvider,
	getUser: async (event) => {
		const s = await event?.locals?.getSession();

		if (s && s.user) {
			// @ts-ignore
			const u = await remult.repo(User).findId(s.user.id);
			return taint(u) ?? undefined;
		}
		return undefined;
	},
	initApi: async () => {
		// Add default users...
		const uAdmin = await remult.repo(User).findFirst({ name: 'Admin' });
		if (!uAdmin) {
			await remult.repo(User).insert({ name: 'Admin' });
		}
		const uManager = await remult.repo(User).findFirst({ name: 'Manager' });
		if (!uManager) {
			await remult.repo(User).insert({ name: 'Manager' });
		}

		// reset all questions!
		// const repo = remult.repo(Question);
		// const qs = await repo.find();
		// qs.forEach(async (q) => {
		// 	await repo.delete(q);
		// });
	}
});
