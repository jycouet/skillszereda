import { remultSveltekit } from 'remult/remult-sveltekit';

// import { TasksController } from '../shared/tasksController';
import type { UserInfo } from 'remult';
import { Question } from '../shared/question';

export const handleRemult = remultSveltekit({
	entities: [Question],
	// controllers: [TasksController],
	getUser: async (event) => (await event?.locals?.getSession())?.user as UserInfo
});
