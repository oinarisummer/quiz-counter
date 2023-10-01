<script lang="ts">
	import { Rule } from '$lib/rules';
	import { Button, Card, CloseButton } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, UndoOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import ScoreCounter from './scoreCounter.svelte';
	import SimpleCounter from './simpleCounter.svelte';

	export let rule: Rule;

	export let whenCorrect: number;

	export let whenIncorrect: number;

	let correct: number;

	let incorrect: number;

	let score: number;

	let undoStack: Array<{ correct: number; worng: number; score: number }> = [];

	$: undoStack.push({ correct: correct, worng: incorrect, score: score });

	const dispatch = createEventDispatcher();

	const undo = () => {
		const pop = undoStack.pop();
		if (pop) {
			correct = pop.correct;
			incorrect = pop.worng;
			score = pop.score;
		}
	};

	const reset = () => {
		score = 0;
		correct = 0;
		incorrect = 0;
		undoStack = [];
	};

    
	function deleteClick() {
		dispatch('delete');
	}
</script>

<Card>
	<div class="flex justify-end gap-4">
		{#if undoStack.length > 0}
			<Button color="dark" size="xs" on:click={undo}><UndoOutline /></Button>
		{:else}
			<Button color="dark" size="xs" disabled><UndoOutline /></Button>
		{/if}
		<Button color="dark" size="xs" on:click={reset}><ArrowsRepeatSolid /></Button>
		<CloseButton on:click={deleteClick} />
	</div>

	<input placeholder="Name?" class="text-xl m-2" />

    {#if rule === Rule.simple}
        <SimpleCounter bind:correct bind:incorrect />
    {:else if rule === Rule.mn}
        <ScoreCounter {whenCorrect} {whenIncorrect} bind:correct bind:incorrect bind:score />
    {/if}
</Card>
