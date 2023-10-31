<script lang="ts">
	import '../app.postcss';
	import { Remult, remult } from 'remult';
	import type { LayoutData } from './$types';
	import { signOut } from '@auth/sveltekit/client';
	import { Role } from '../shared/Role';
	import { Question } from '../shared/question';
	import SelectTheme from '$lib/SelectTheme.svelte';

	export let data: LayoutData;

	// set this globaly
	$: remult.user = data.user;
</script>

<svelte:head>
	<title>Skillszereda</title>
</svelte:head>

<div class="container m-auto px-4 flex flex-col gap-4">
	<div class="flex justify-between items-center">
		<h1><a href="/" class="text-4xl text-accent">💯 Skillszereda</a></h1>
		<span class="flex gap-4 items-center">
			<span>
				👋 {remult.user?.name}
			</span>
			<SelectTheme />
		</span>
	</div>

	<div class="flex justify-between">
		<!-- {#if remult.user?.roles?.includes(Role.ADMIN)} -->
		{#if remult.repo(Question).metadata.apiInsertAllowed()}
			<a class="link link-secondary" href="/questions">Questions</a>
		{/if}
		<a class="link link-secondary" href="/" on:click={signOut}>Sign Out</a>
	</div>

	<slot />

	<em class="text-xs">© Dynamic Process {new Date().getFullYear()}</em>
</div>
