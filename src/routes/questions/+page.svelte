<script lang="ts">
	import { remult } from 'remult';

	import { browser, dev } from '$app/environment';

	import { kitStoreList } from '$lib/kitStoreList';
	import { Question } from '../../shared/question';
	import Card from '$lib/Card.svelte';

	// export let data: PageData;

	// get the repo
	const repo = remult.repo(Question);

	// Start with SSR tasks then subscribe to changes (respecting options!)
	const store = kitStoreList(repo, { items: [], loading: true, totalCount: 0 });
	// $: browser && store.listen({});
	$: browser && !dev && store.listen({});
	$: browser && dev && store.fetch({});

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

<h2 class="text-2xl text-accent">Questions CRUD</h2>

{#if repo.metadata.apiInsertAllowed()}
	<div class="w-96">
		<Card>
			<div class="card-title">Add a question</div>
			<form class="flex gap-2" on:submit|preventDefault={addQuestion}>
				<input
					class="input input-bordered w-full max-w-xs"
					bind:value={newTaskTitle}
					placeholder={repo.fields.description.caption}
				/>
				<button class="btn btn-primary">Add</button>
			</form>
		</Card>
	</div>
{/if}

<Card>
	<div class="overflow-x-auto">
		<table class="table">
			<tr>
				<th>Description</th>
				<th>Track</th>
				<th>Level</th>
				<th>Order</th>
				<th>Actions</th>
			</tr>

			{#each $store.items ?? [] as item}
				<tr>
					<td
						><textarea
							class="textarea textarea-bordered w-full"
							bind:value={item.description}
							rows="3"
						/>
					</td>
					<td>
						<select class="select select-bordered w-full max-w-xs" bind:value={item.track}>
							{#each repo.fields.track.options?.valueConverter?.values ?? [] as l}
								<option value={l}>{l.caption}</option>
							{/each}
						</select>
					</td>
					<td>
						<select class="select select-bordered w-full max-w-xs" bind:value={item.level}>
							{#each repo.fields.level.options?.valueConverter?.values ?? [] as l}
								<option value={l}>{l.caption}</option>
							{/each}
						</select>
					</td>
					<td>
						<input class="input input-bordered w-20" type="number" bind:value={item.order} />
					</td>
					<td>
						<span class="flex gap-2">
							<button class="btn btn-primary" on:click={() => saveQuestion(item)}>Save</button>
							<button class="btn btn-ghost" on:click={() => deleteQuestion(item)}>Delete</button>
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
	</div>
</Card>
