<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { RuleType } from '$lib/definitions/rules';
	import { rule } from '$lib/store/store';
	import { Button } from 'flowbite-svelte';
	import { CheckSolid, CloseSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let counterParameter: CounterParameters;

	const dispatch = createEventDispatcher();

	const changeScore = () => {
		dispatch('changed', counterParameter.id);
	};

	const onCorrect = () => {
		changeScore();
		counterParameter.correct++;
	};

	const onIncorrect = () => {
		changeScore();

		switch ($rule) {
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
	<Button color="red" class="h-10" on:click={onCorrect}><CheckSolid /></Button>
	<p class="text-5xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" class="h-10" on:click={onIncorrect}><CloseSolid /></Button>
</div>
