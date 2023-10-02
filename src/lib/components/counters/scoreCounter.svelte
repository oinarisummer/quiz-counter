<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { Rule } from '$lib/definitions/rules';
	import { inicialPoint, rule, whenCorrect, whenIncorrect } from '$lib/store/store';
	import { Button } from 'flowbite-svelte';
	import { CheckCircleSolid, CloseCircleSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let counterParameter: CounterParameters;

	const dispatch = createEventDispatcher();

	const changeScore = () => {
		dispatch('changed');
	};

	const onCorrect = () => {
		changeScore();
		switch ($rule) {
			case Rule.divide:
				counterParameter.correct++;
				counterParameter.score += $inicialPoint;
				break;
			default:
				counterParameter.correct++;
		}
		calcScore($whenCorrect);
	};

	const onIncorrect = () => {
		changeScore();
		switch ($rule) {
			case Rule.by:
				counterParameter.incorrect += $whenIncorrect;
				break;
			case Rule.divide:
				counterParameter.incorrect++;
				counterParameter.score = Math.floor(counterParameter.score / counterParameter.incorrect);
				break;
			default:
				counterParameter.incorrect++;
		}
		calcScore($whenIncorrect);
	};

	const calcScore = (scoreDelta: number) => {
		switch ($rule) {
			case Rule.mn:
				counterParameter.score = counterParameter.score + scoreDelta;
				break;
			case Rule.by:
				counterParameter.score = counterParameter.correct * counterParameter.incorrect;
				break;
			case Rule.divide:
				break;
		}
	};
</script>

<span class="flex justify-center"
	><p class="text-6xl text-black dark:text-white">{counterParameter.score}</p></span
>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{counterParameter.correct}</p>
	<Button color="red" on:click={onCorrect}><CheckCircleSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" on:click={onIncorrect}><CloseCircleSolid /></Button>
</div>
