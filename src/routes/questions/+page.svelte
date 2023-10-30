<script lang="ts">
	import { remult } from 'remult';

	import { browser } from '$app/environment';

	import { kitStoreList } from '$lib/kitStoreList';
	import { Question } from '../../shared/question';
	import { QuestionLevel } from '../../shared/QuestionLevel';

	// export let data: PageData;

	// get the repo
	const repo = remult.repo(Question);

	// Start with SSR tasks then subscribe to changes (respecting options!)
	const store = kitStoreList(repo, { items: [], loading: true, totalCount: 0 });
	// $: browser && store.listen({});
	$: browser && store.fetch({});

	let newTaskTitle = '';

	async function addQuestion() {
		try {
			await repo.insert({ description: newTaskTitle });
			newTaskTitle = '';
		} catch (error: any) {
			alert(error.message);
		}
	}
	async function deleteQuestion(q: Question) {
		try {
			await repo.delete(q);
		} catch (error: any) {
			alert(error.message);
		}
	}
	async function saveQuestion(q: Question) {
		try {
			const tt = await repo.save(q);
		} catch (error: any) {
			alert(error.message);
		}
	}
	// async function setAllCompleted(completed: boolean) {
	// 	await TasksController.setAllCompleted(completed);
	// }

	// function updateLimit(direction: 'MORE' | 'LESS') {
	// 	const limit = parseInt($page.url.searchParams.get('limit') || '3');
	// 	const newLimit = direction === 'MORE' ? limit + 1 : limit - 1;

	// 	// Let's not go bellow 1!
	// 	if (newLimit < 1) return;

	// 	goto(`/?limit=${newLimit}`);
	// }
</script>

<h2>Questions CRUD</h2>
<main>
	<!-- <div>
		<button on:click={() => updateLimit('LESS')}>Less</button>
		<i>Show</i>
		<button on:click={() => updateLimit('MORE')}>More</button>
	</div> -->
	{#if repo.metadata.apiInsertAllowed()}
		<form class="flex" on:submit|preventDefault={addQuestion}>
			<input
				style="width: 100%;"
				bind:value={newTaskTitle}
				placeholder="The description goes here!"
			/>
			<button>Add</button>
		</form>
	{/if}
	<table>
		<tr>
			<th>Description</th>
			<th>Level</th>
			<th>Actions</th>
		</tr>

		{#each $store.items ?? [] as item}
			<tr>
				<td>
					<!-- <input type="checkbox" bind:checked={item.completed} on:change={() => saveTask(item)} /> -->
					<input bind:value={item.description} />
				</td>
				<td>
					<select bind:value={item.level}>
						{#each repo.fields.level.options?.valueConverter?.values ?? [] as l}
							<option value={l}>{l.caption}</option>
						{/each}
					</select>
				</td>
				<td>
					<button on:click={() => saveQuestion(item)}>Save</button>
					<button on:click={() => deleteQuestion(item)}>Delete</button>
				</td>
			</tr>
		{/each}
	</table>
	<!-- <div>
		<button on:click={() => setAllCompleted(true)}>Set all completed</button>
		<button on:click={() => setAllCompleted(false)}>Set all UnCompleted</button>
	</div> -->
</main>
