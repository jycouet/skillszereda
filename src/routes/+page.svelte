<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import Card from '$lib/Card.svelte';
	import { kitStoreList } from '$lib/kitStoreList';
	import { remult, type FindOptions } from 'remult';
	import { Assessment } from '../shared/assessment';
	import { AssessmentController } from '../shared/assessmentController';

	const repo = remult.repo(Assessment);

	const store = kitStoreList(repo, { items: [], loading: true, totalCount: 0 });

	const options: FindOptions<Assessment> = {
		where: remult.user && (remult.user.roles ?? []).length === 0 ? { whoId: remult.user?.id } : {},
		include: { who: true }
	};

	$: browser && !dev && store.listen(options);
	$: browser && dev && store.fetch(options);

	const start = async () => {
		const aId = await AssessmentController.start(remult.user?.name!);
		goto(`/assessment/${aId}`);
	};
</script>

<h2>Welcome here 😉!</h2>

<Card>
	<div class="card-title">List of Assessment</div>
	{#each $store.items as item}
		<div>
			<a class="link link-secondary" href="/assessment/{item.id}"
				>{item.date.toLocaleString()} with {item.who.name}</a
			>
		</div>
	{/each}
	{#if remult.user && (remult.user.roles ?? []).length === 0}
		<button class="btn btn-primary" on:click={start}>Start new Assessment</button>
	{/if}
</Card>
