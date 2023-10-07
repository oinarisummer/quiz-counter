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
		dispatch('changed');
	};

	const onCorrect = () => {
		changeScore();
		counterParameter.correct++;
	};

	const onIncorrect = () => {
		changeScore();

		switch ($rule) {
			case RuleType.swedish:
				counterParameter.incorrect += swedishNext;
				break;
			default:
				throw new Error('undefined Rule');
		}
	};

	$: swedishNext = Math.ceil((-1 + Math.sqrt(1 + 8 * (counterParameter.correct + 1))) / 2);
</script>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-5xl text-black dark:text-white">{counterParameter.correct}</p>
	<Button color="red" class="h-10" on:click={onCorrect}><CheckSolid /></Button>
	<p class="text-5xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" class="h-10" on:click={onIncorrect}><CloseSolid /></Button>
</div>
<div class="grid justify-items-center grid-cols-2">
	<div></div>
	<p color="gray" class="col-start-2">Next: {swedishNext}✗</p>
</div>
