<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { remult } from 'remult';
</script>

<div class="flex">
	<h1>Welcome to 💯 Skillszereda</h1>
	<span style="margin-bottom: 12px;">
		👋 {remult.user?.name} <button on:click={signOut}>Sign Out</button>
	</span>
</div>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
		align-items: end;
	}
</style>
