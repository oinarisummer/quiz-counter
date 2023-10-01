<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import {
		CheckCircleSolid,
		CloseCircleSolid
	} from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let correct = 0;

	export let incorrect = 0;

	const dispatch = createEventDispatcher();

	const changeScore = () => {
		dispatch('changed');
	}

	const onCorrect = () => {
		changeScore();
		correct++;
	};

	const onWorng = () => {
		changeScore();
		incorrect++;
	};
</script>

<div class="grid justify-items-center grid-rows-2 grid-flow-col">
	<p class="text-4xl text-black dark:text-white">{correct}</p>
	<Button color="red" on:click={onCorrect}><CheckCircleSolid /></Button>
	<p class="text-4xl text-black dark:text-white">{incorrect}</p>
	<Button color="blue" on:click={onWorng}><CloseCircleSolid /></Button>
</div>
