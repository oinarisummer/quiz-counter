<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { RuleType } from '$lib/definitions/rules';
	import { ruleSet } from '$lib/state/state.svelte';
	import { Button } from 'flowbite-svelte';
	import { CheckOutline, CloseOutline } from 'flowbite-svelte-icons';

	let {
		counterParameter = $bindable(), 
		changed
	}: {
		counterParameter: CounterParameters, 
		changed: (id: number) => void
	} = $props();

	const onCorrect = () => {
		changed(counterParameter.id);
		counterParameter.correct++;
	};

	const onIncorrect = () => {
		changed(counterParameter.id);

		switch (ruleSet.rule) {
			case RuleType.simple:
				counterParameter.incorrect++;
				break;
			case RuleType.updown:
				counterParameter.incorrect++;
				counterParameter.correct = 0;
				break;
			case RuleType.swedish:
				counterParameter.incorrect += Math.ceil(
					(-1 + Math.sqrt(1 + 8 * (counterParameter.correct + 1))) / 2
				);
				break;
			default:
				throw new Error('undefined Rule');
		}
	};
</script>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-5xl text-black dark:text-white">{counterParameter.correct}</p>
	<Button color="red" class="h-10" onclick={onCorrect}><CheckOutline /></Button>
	<p class="text-5xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" class="h-10" onclick={onIncorrect}><CloseOutline /></Button>
</div>
