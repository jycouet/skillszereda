<script lang="ts">
	import { Remult, remult } from 'remult';
	import type { LayoutData } from './$types';
	import { signOut } from '@auth/sveltekit/client';
	import { Role } from '../shared/Role';
	import { Question } from '../shared/question';

	export let data: LayoutData;

	// set this globaly
	$: remult.user = data.user;
</script>

<svelte:head>
	<title>Skillszereda</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
</svelte:head>

<div class="content">
	<div class="flex">
		<h1><a href="/" style="color: white;">💯 Skillszereda</a></h1>
		<span style="margin-bottom: 12px;">
			👋 {remult.user?.name} <a href="/" on:click={signOut}>Sign Out</a>
		</span>
	</div>

	<style>
		.flex {
			display: flex;
			justify-content: space-between;
			align-items: end;
		}
	</style>

	<!-- {#if remult.user?.roles?.includes(Role.ADMIN)} -->
	{#if remult.repo(Question).metadata.apiInsertAllowed()}
		<a href="/questions">Questions</a>
	{/if}

	<hr />

	<slot />
</div>

<div class="footer">
	<hr />
	<em>© Dynamic Process {new Date().getFullYear()}</em>
</div>

<style>
	.content {
		flex: 1 0 auto;
	}
	.footer {
		margin: 1rem;
		flex-shrink: 0;
	}
</style>
