import { Entity, Fields, Validators } from 'remult';

@Entity('users', {
	// allowApiRead: Allow.authenticated,
	// allowApiCrud: Role.ADMIN
	allowApiCrud: true
})
export class User {
	@Fields.cuid()
	id = '';

	@Fields.string({ validate: Validators.uniqueOnBackend })
	name = '';
}
