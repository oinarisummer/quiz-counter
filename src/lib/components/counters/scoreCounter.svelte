<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import {
		CheckCircleSolid,
		CloseCircleSolid
	} from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export const id: string = crypto.randomUUID();

	export let whenCorrect = 1;

	export let whenIncorrect = -1;

	export let correct: number = 0;

	export let incorrect: number = 0;

	export let score: number = 0;

	const dispatch = createEventDispatcher();

	const changeScore = () => {
		dispatch('changed');
	}

	const onCorrect = () => {
		changeScore();
		correct++;
		score = score + whenCorrect;
	};

	const onWorng = () => {
		changeScore();
		incorrect++;
		score = score + whenIncorrect;
	};
</script>

<span class="flex justify-center"><p class="text-6xl text-black dark:text-white">{score}</p></span>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{correct}</p>
	<Button color="red" on:click={onCorrect}><CheckCircleSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{incorrect}</p>
	<Button color="blue" on:click={onWorng}><CloseCircleSolid /></Button>
</div>
