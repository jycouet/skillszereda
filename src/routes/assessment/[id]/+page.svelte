<script lang="ts">
	import { page } from '$app/stores';
	import { remult } from 'remult';
	import { Assessment } from '../../../shared/assessment';
	import { onMount } from 'svelte';
	import Card from '$lib/Card.svelte';
	import { QuestionInAssessement } from '../../../shared/questionsInAssessement';
	import { Role } from '../../../shared/Role';

	const assessmentId = $page.params.id;
	let a: Assessment | undefined = undefined;
	onMount(async () => {
		const aList = await remult.repo(Assessment).find({
			where: { id: assessmentId },
			include: {
				questionsInAssessement: {
					include: {
						question: true,
						assessment: true
					}
				},
				who: true,
				manager: true
			}
		});
		a = aList[0];
	});

	const castQuestionsInAssessement = (a: Assessment) => {
		const qia = (a.questionsInAssessement ?? []) as QuestionInAssessement[];
		return (
			qia.sort((a, b) => {
				// Compare by question.track.id first
				if (a.question.track.id < b.question.track.id) {
					return -1;
				} else if (a.question.track.id > b.question.track.id) {
					return 1;
				} else {
					// If question.track.id is the same, compare by question.order
					return a.question.order - b.question.order;
				}
			}) ?? []
		);
	};

	const save = async (item: QuestionInAssessement) => {
		await remult.repo(QuestionInAssessement).save(item);
	};
</script>

{#if a && remult.user}
	<h2 class="text-2xl text-accent">
		Assessment between <span class="text-primary">{a.who.name}</span> and
		<span class="text-primary">{a.manager.name}</span> on the
		<span class="text-primary">{a.date.toLocaleDateString()}</span>
	</h2>

	<Card>
		<table class="table">
			<tr>
				<th>Question</th>
				<th>{a.who.name}</th>
				<th>{a.manager.name}</th>
			</tr>

			{#each castQuestionsInAssessement(a) as item}
				<tr>
					<td
						><div><b>{item.question.track.caption}</b></div>
						{item.question.description}</td
					>
					<td>
						<select
							disabled={(remult.user.roles ?? []).includes(Role.MANAGER)}
							class="select select-bordered w-full max-w-xs"
							bind:value={item.whoScore}
							on:change={() => save(item)}
						>
							{#each remult.repo(QuestionInAssessement).fields.whoScore.options?.valueConverter?.values ?? [] as l}
								<option value={l}>{l.caption}</option>
							{/each}
						</select>
					</td>
					<td>
						<select
							disabled={!(remult.user.roles ?? []).includes(Role.MANAGER)}
							class="select select-bordered w-full max-w-xs"
							bind:value={item.managerScore}
							on:change={() => save(item)}
						>
							{#each remult.repo(QuestionInAssessement).fields.managerScore.options?.valueConverter?.values ?? [] as l}
								<option value={l}>{l.caption}</option>
							{/each}
						</select>
					</td>
				</tr>
			{/each}
		</table>
	</Card>
{:else}
	Loading...
{/if}
