<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { Rule } from '$lib/definitions/rules';
	import { Button } from 'flowbite-svelte';
	import { CheckCircleSolid, CloseCircleSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let rule: Rule;

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

		switch (rule) {
			case Rule.simple:
				counterParameter.incorrect++;
				break;
			case Rule.updown:
				counterParameter.incorrect++;
				counterParameter.correct = 0;
				break;
			case Rule.swedish:
				counterParameter.incorrect += Math.ceil(
					(-1 + Math.sqrt(1 + 8 * (counterParameter.correct + 1))) / 2
				);
				break;
		}
	};
</script>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{counterParameter.correct}</p>
	<Button color="red" on:click={onCorrect}><CheckCircleSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{counterParameter.incorrect}</p>
	<Button color="blue" on:click={onIncorrect}><CloseCircleSolid /></Button>
</div>
