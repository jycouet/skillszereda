import { Allow, Entity, Field, Fields, Validators } from 'remult';
import { Role } from './Role';
import { QuestionLevel } from './QuestionLevel';
import { QuestionTrack } from './QuestionTrack';

@Entity('questions', {
	// allowApiRead: Allow.authenticated,
	// allowApiCrud: Role.ADMIN
	allowApiCrud: true
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
