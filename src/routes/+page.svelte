<script lang="ts">
	import CounterFrame from '$lib/components/counters/counterFrame.svelte';
	import RuleSetting from '$lib/components/ruleSetting.svelte';
	import { RuleType, ruleName } from '$lib/definitions/rules';
	import { nByMGoalScore, nByMParameters, rule, whenCorrect, whenIncorrect } from '$lib/store/store';
	import { Button, Modal, Tooltip } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, GearSolid, PlusSolid } from 'flowbite-svelte-icons';

	let keys: Array<number> = [1];

	$: counters = new Array<CounterFrame>(keys.length);

	const addCard = () => {
		keys = [...keys, Math.max(...keys) + 1];
	};

	const deleteCard = (event: CustomEvent) => {
		keys = keys.toSpliced(event.detail, 1);
	};

	// TODO: is not working
	const allReset = () => {
		counters.map((counter) => {
			counter.reset();
		});
	};

	let popupModal = false;

	$: title = () => {
		switch($rule) {
			case RuleType.mn:
				return `+${$whenCorrect}/${$whenIncorrect}`
			case RuleType.by:
				return `${$nByMParameters.n} by ${$nByMParameters.m} (${$nByMGoalScore})`
			case RuleType.backstream:
				return $whenIncorrect == -1 ? 'Backstream -n' : `Backstream ${$whenIncorrect}n`
			default:
				return ruleName($rule)
		}
	}
</script>

<div class="flex justify-center align-middle mb-4 p-1" style="background-color:lightsteelblue;">
	<p class="text-3xl">{title()}</p>
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
			<CounterFrame bind:this={counters[index]} order={index} on:delete={deleteCard} />
		{/each}
		<Button color="dark" outline={true} on:click={addCard}><PlusSolid /></Button>
	</div>
</div>

<Modal bind:open={popupModal} size="md" outsideclose><RuleSetting /></Modal>
