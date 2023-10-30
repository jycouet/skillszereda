<script lang="ts">
	import { remult } from 'remult';

	import { browser } from '$app/environment';

	import { kitStoreList } from '$lib/kitStoreList';
	import { Question } from '../../shared/question';

	// export let data: PageData;

	// get the repo
	const repo = remult.repo(Question);

	// Start with SSR tasks then subscribe to changes (respecting options!)
	const store = kitStoreList(repo, { items: [], loading: true, totalCount: 0 });
	$: browser && store.listen({});
	// $: browser && store.fetch({});

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
</script>

<h2>Questions CRUD</h2>
<main>
	{#if repo.metadata.apiInsertAllowed()}
		<form class="flex" style="border-bottom: 1px dashed;" on:submit|preventDefault={addQuestion}>
			<input
				style="width: 100%;"
				bind:value={newTaskTitle}
				placeholder="The description goes here!"
			/>
			<button>Add</button>
		</form>
	{/if}
	<table>
		<!-- <tr>
			<th>Track</th>
			<th>Level</th>
			<th>Actions</th>
		</tr> -->

		{#each $store.items ?? [] as item}
			<tr>
				<td colspan="3">
					<textarea bind:value={item.description} rows="3" />
				</td>
			</tr>
			<tr style="border-bottom: 1px dashed;">
				<td>
					<select bind:value={item.track}>
						{#each repo.fields.track.options?.valueConverter?.values ?? [] as l}
							<option value={l}>{l.caption}</option>
						{/each}
					</select>
				</td>
				<td>
					<select bind:value={item.level}>
						{#each repo.fields.level.options?.valueConverter?.values ?? [] as l}
							<option value={l}>{l.caption}</option>
						{/each}
					</select>
				</td>
				<td>
					<span class="flex">
						<button on:click={() => saveQuestion(item)}>Save</button>
						<button on:click={() => deleteQuestion(item)}>Delete</button>
					</span>
				</td>
			</tr>
		{:else}
			{#if $store.loading}
				Loading...
			{:else}
				No Data
			{/if}
		{/each}
	</table>
	<!-- <div>
		<button on:click={() => setAllCompleted(true)}>Set all completed</button>
		<button on:click={() => setAllCompleted(false)}>Set all UnCompleted</button>
	</div> -->
</main>
