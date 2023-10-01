<script lang="ts">
	import CounterFrame from '$lib/components/counters/counterFrame.svelte';
	import Menu from '$lib/components/menu.svelte';
	import type { GameParameters, NbyMParameters } from '$lib/definitions/parameters';
	import { Rule, ruleName } from '$lib/definitions/rules';
	import { Button, Modal, Tooltip } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, GearSolid, PlusSolid } from 'flowbite-svelte-icons';

	let keys: Array<number> = [1];

	$: counters = new Array<CounterFrame>(keys.length);

	let gameParameter: GameParameters =
	{
		rule: Rule.simple,
    	whenCorrect: 1,
    	whenIncorrect: -1,
    	inicialPoint: 0,
	}

	let nbyMParameter: NbyMParameters;

	let rule: Rule = Rule.simple;

	const addCard = () => {
		keys = [...keys, Math.max(...keys)+1]
	}

	const deleteCard = (event: CustomEvent) => {
		keys = keys.toSpliced(event.detail, 1);
	}

	// TODO: is not working
	const allReset = () => {
		counters.map((counter) => {
			counter.reset();
		});
	}
	
	let popupModal = false;
</script>


<div class="flex justify-center align-middle mb-4 p-1" style="background-color:lightsteelblue;">
	<p class="text-3xl">{ruleName(gameParameter.rule)}</p>
</div>

<div class="container mx-auto">
	<div class="flex justify-end align-middle gap-3 m-3">
		<Button type="button" outline={true} color="dark" on:click={allReset} disabled
			><ArrowsRepeatSolid />
		</Button>
		<Tooltip>Unavailable due to a bug</Tooltip>
		<button type="button" on:click={() => (popupModal = true)}><GearSolid /></button>
	</div>

	<div class="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each keys as key, index (key)}
		<CounterFrame
			bind:this={counters[index]}
			{gameParameter}
			{nbyMParameter}
			order={index}
			on:delete={deleteCard}
		/>
		{/each}
		<Button color="dark" outline={true} on:click={addCard}><PlusSolid /></Button>
	</div>
</div>

<Modal bind:open={popupModal} size="md" outsideclose><Menu bind:gameParameter /></Modal>
