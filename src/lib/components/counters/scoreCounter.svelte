<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { RuleType } from '$lib/definitions/rules';
	import { inicialPoint, rule, whenCorrect, whenIncorrect } from '$lib/store/store';
	import { Button } from 'flowbite-svelte';
	import { CheckSolid, CloseSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let counterParameter: CounterParameters;

	const dispatch = createEventDispatcher();

	const changeScore = () => {
		dispatch('changed');
	};

	const onCorrect = () => {
		changeScore();

		switch ($rule) {
			case RuleType.mn:
				counterParameter.correct++;
				counterParameter.score += $whenCorrect;
				break;
			case RuleType.by:
				counterParameter.correct++;
				counterParameter.score = counterParameter.correct * counterParameter.incorrect;
				break;
			case RuleType.divide:
				counterParameter.correct++;
				counterParameter.score += $inicialPoint;
				break;
			case RuleType.backstream:
				counterParameter.correct++;
				counterParameter.score += $whenCorrect;
				break;
			default:
				throw new Error('undefined Rule');
		}
	};

	const onIncorrect = () => {
		changeScore();

		switch ($rule) {
			case RuleType.mn:
				counterParameter.incorrect++;
				counterParameter.score += $whenIncorrect;
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
				counterParameter.score += $whenIncorrect * counterParameter.incorrect;
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
	<Button color="red" on:click={onCorrect}><CheckSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" on:click={onIncorrect}><CloseSolid /></Button>
</div>
