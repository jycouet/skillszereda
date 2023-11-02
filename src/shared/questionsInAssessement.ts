import { Entity, Field, Fields, Relations } from 'remult';
import { Score } from './Score';
import { Assessment } from './assessment';
import { Question } from './question';

@Entity<QuestionInAssessement>('questionsInAssessement', {
	// allowApiRead: Allow.authenticated,
	// allowApiCrud: Role.ADMIN
	allowApiCrud: true,
	id: {
		assessementId: true,
		questionId: true
	}
})
export class QuestionInAssessement {
	@Fields.string()
	questionId = '';

	@Relations.toOne(() => Question, { field: 'questionId' })
	question!: Question;

	@Fields.string()
	assessementId = '';

	@Relations.toOne(() => Assessment, { field: 'assessementId' })
	assessement!: Assessment;

	@Field(() => Score, { inputType: 'selectEnum' })
	whoScore = Score.NOTSET;

	@Field(() => Score, { inputType: 'selectEnum' })
	managerScore = Score.NOTSET;
}
