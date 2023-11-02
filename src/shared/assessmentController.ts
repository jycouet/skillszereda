import { Allow, BackendMethod, remult } from 'remult';
import { Assessment } from './assessment';
import { Question } from './question';
import { QuestionInAssessement } from './questionsInAssessement';
import { User } from './user';

export class AssessmentController {
	@BackendMethod({ allowed: Allow.authenticated })
	static async start(userName: string) {
		const qs = await remult.repo(Question).find();

		const manager = await remult.repo(User).findFirst({ name: 'Manager' });
		const who = await remult.repo(User).findFirst({ name: userName });

		const a = await remult.repo(Assessment).insert({ managerId: manager.id, whoId: who.id });

		for (let i = 0; i < qs.length; i++) {
			await remult
				.repo(QuestionInAssessement)
				.insert({ assessementId: a.id, questionId: qs[i].id });
		}

		return a.id;
	}
}
