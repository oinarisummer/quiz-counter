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

		switch (ruleSet.rule) {
			case RuleType.mn:
				counterParameter.correct++;
				counterParameter.score += ruleSet.whenCorrect;
				break;
			case RuleType.by:
				counterParameter.correct++;
				counterParameter.score = counterParameter.correct * counterParameter.incorrect;
				break;
			case RuleType.divide:
				counterParameter.correct++;
				counterParameter.score += ruleSet.inicialPoint;
				break;
			case RuleType.backstream:
				counterParameter.correct++;
				counterParameter.score += ruleSet.whenCorrect;
				break;
			default:
				throw new Error('undefined Rule');
		}
	};

	const onIncorrect = () => {
		changed(counterParameter.id);

		switch (ruleSet.rule) {
			case RuleType.mn:
				counterParameter.incorrect++;
				counterParameter.score += ruleSet.whenIncorrect;
				break;
			case RuleType.by:
				counterParameter.incorrect--;
				counterParameter.score = counterParameter.correct * counterParameter.incorrect;
				break;
			case RuleType.divide:
				counterParameter.incorrect++;
				counterParameter.score = Math.floor(counterParameter.score / counterParameter.incorrect);
				break;
			case RuleType.backstream:
				counterParameter.incorrect++;
				counterParameter.score += ruleSet.whenIncorrect * counterParameter.incorrect;
				break;
			default:
				throw new Error('undefined Rule');
		}
	};
</script>

<span class="flex justify-center">
	<p class="text-6xl text-black dark:text-white">{counterParameter.score}</p>
</span>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{counterParameter.correct}</p>
	<Button color="red" onclick={onCorrect}><CheckOutline /></Button>
	<p class="text-4xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" onclick={onIncorrect}><CloseOutline /></Button>
</div>
