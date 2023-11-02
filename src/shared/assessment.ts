import { Entity, Fields, Relations } from 'remult';
import { QuestionInAssessement } from './questionsInAssessement';
import { User } from './user';

@Entity('assessments', {
	// allowApiRead: Allow.authenticated,
	// allowApiCrud: Role.ADMIN
	allowApiCrud: true
})
export class Assessment {
	@Fields.cuid()
	id = '';

	@Fields.date()
	date = new Date();

	@Fields.string()
	whoId = '';

	@Relations.toOne(() => User, { field: 'whoId' })
	who!: User;

	@Fields.string()
	managerId = '';

	@Relations.toOne(() => User, { field: 'managerId' })
	manager!: User;

	@Relations.toMany(() => QuestionInAssessement)
	questionsInAssessement = [];
}
