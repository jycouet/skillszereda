import { Allow, Entity, Field, Fields, Validators, remult } from 'remult';
import { Role } from './Role';
import { QuestionLevel } from './QuestionLevel';
import { QuestionTrack } from './QuestionTrack';
import { QuestionInAssessement } from './questionsInAssessement';

@Entity<Question>('questions', {
	// allowApiRead: Allow.authenticated,
	// allowApiCrud: Role.ADMIN
	allowApiCrud: true,
	deleting: async (entity, e) => {
		const found = await remult.repo(QuestionInAssessement).findFirst({ questionId: entity.id });
		if (found) {
			throw new Error('Cannot delete a question that is already used!');
			// TODO Implement hide? :)
		}
	}
})
export class Question {
	@Fields.cuid()
	id = '';

	@Fields.string<Question>({
		caption: "Question's description",
		validate: (task) => {
			if (task.description.length < 3) throw Error('Too short');
		}
	})
	description = '';

	@Fields.number({ dbName: '"order"' })
	order = 0;

	@Field(() => QuestionLevel, { inputType: 'selectEnum' })
	level = QuestionLevel.JUNIOR;

	@Field(() => QuestionTrack, { inputType: 'selectEnum' })
	track = QuestionTrack.SOFT;
}
