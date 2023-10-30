import { Allow, Entity, Fields, Validators } from 'remult';
import { Role } from './Role';

@Entity('questions', {
	allowApiRead: Allow.authenticated,
	allowApiCrud: Role.ADMIN
})
export class Question {
	@Fields.cuid()
	id = '';

	@Fields.string<Question>({
		validate: (task) => {
			if (task.description.length < 3) throw Error('Too short');
		}
	})
	description = '';
}
