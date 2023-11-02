import type { FindOptions, Repository } from 'remult';
import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';

import { browser } from '$app/environment';

type TheStore<T> = { items: T[]; loading: boolean; totalCount: number | undefined };

/**
 * @param repo remult repository to listen to
 * @param initValues usually the data coming from SSR
 * @returns a store with the initial values and a listen() method to subscribe to changes
 *
 * Example
 * ```ts
 * // get the repo
 * const taskRepo = remult.repo(Task)
 *
 * const tasks = kitStore(taskRepo, data.tasks)
 * $: browser && tasks.listen(data.options)
 * ```
 */
export const kitStoreList = <T>(
	repo: Repository<T>,
	initValues: TheStore<T> = { items: [], loading: true, totalCount: undefined }
) => {
	const { subscribe, set, update } = writable<TheStore<T>>(initValues);
	let unSub: any = null;

	onDestroy(async () => {
		await plzUnSub();
	});

	// if we already have a subscription, unsubscribe (on option update for example)
	const plzUnSub = async () => {
		if (unSub) {
			// 		let source: EventSource;
			// onMount(() => {
			// 	source = new EventSource('api/stream');
			// });
			// onDestroy(() => source?.close());
			unSub();
			// const un = unSub
			// unSub = null;
			// await un();
		}
	};

	return {
		subscribe,
		// set,
		fetch: async (options?: FindOptions<T>) => {
			if (browser) {
				update((s) => ({ ...s, loading: true }));

				// Strategy 1: count first then look
				// const totalCount = await repo.count(options?.where)
				// const items = totalCount > 0 ? await repo.find(options) : []

				// Strategy 2: parallel
				const [items, totalCount] = await Promise.all([
					await repo.find(options),
					await repo.count(options?.where)
				]);

				set({ loading: false, items, totalCount });
			}
		},
		listen: async (options?: FindOptions<T>) => {
			if (browser) {
				await plzUnSub();

				unSub = repo.liveQuery(options).subscribe(async (info) => {
					// const notification = new SubscriptionChannel<{message:'string'}>("totalCount of x?");
					// notification.

					const totalCount = await repo.count(options?.where);
					set({ items: info.items, loading: false, totalCount });
				});
			} else {
				throw new Error(`xxx.listen() Too early!

You should do like: 
  let tasks = tasksStore<Task>(taskRepo, data.tasks)
  $: browser && tasks.listen()
				`);
			}
		}
	};
};
