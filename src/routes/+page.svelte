<script lang="ts">
	import CounterFrame from '$lib/components/counters/counterFrame.svelte';
	import Menu from '$lib/components/menu.svelte';
	import { Rule } from '$lib/rules';
	import { Button, Modal } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, GearSolid, PlusSolid } from 'flowbite-svelte-icons';

	let counters = [CounterFrame];

	let rule: Rule = Rule.simple;

	let whenCorrect: number;

	let whenIncorrect: number;

	function addCard() {
		counters = [...counters, CounterFrame];
	}

	function deleteCard(index: number) {
		counters = counters.toSpliced(index, 1);
	}

	function allReset() {
		counters.map((CounterFrame) => {
			CounterFrame.prototype.reset();
		});
	}
	
	let popupModal = false;
</script>

<div class="container mx-auto">
	<div class="flex justify-end align-middle gap-3 m-3">
		<Button type="button" outline={true} color="dark" on:click={allReset}
			><ArrowsRepeatSolid />
		</Button>
		<button type="button" on:click={() => (popupModal = true)}><GearSolid /></button>
	</div>

	<div class="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each counters as CounterFrame, index}
			<svelte:component
				this={CounterFrame}
				{rule}
				{whenCorrect}
				{whenIncorrect}
				on:delete={() => deleteCard(index)}
			/>
		{/each}
		<Button color="dark" outline={true} on:click={addCard}><PlusSolid /></Button>
	</div>
</div>

<Modal bind:open={popupModal} size="xs" ><Menu bind:rule bind:whenCorrect bind:whenIncorrect /></Modal>
