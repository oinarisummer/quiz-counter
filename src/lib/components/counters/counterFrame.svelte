<script lang="ts">
	import type { CounterParameters, GameParameters, NbyMParameters } from '$lib/definitions/parameters';
	import { Rule } from '$lib/definitions/rules';
	import { Button, Card, CloseButton } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, UndoOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import ScoreCounter from './scoreCounter.svelte';
	import SimpleCounter from './simpleCounter.svelte';

	export let gameParameter: GameParameters;

	export let order: number;

	export let nbyMParameter: NbyMParameters;

	export const reset = () => {
		switch (gameParameter.rule) {
			case Rule.by:
				counterParameter.score = 0;
				counterParameter.correct = 0;
				counterParameter.incorrect = nbyMParameter.m;
				break;
			case Rule.divide:
				counterParameter.score = gameParameter.inicialPoint;
				counterParameter.correct = 0;
				counterParameter.incorrect = 0;
				break;
			default:
				counterParameter.score = 0;
				counterParameter.correct = 0;
				counterParameter.incorrect = 0;
		}

		undoStack = [];
	};

	let counterParameter: CounterParameters = {
		score: 0,
		correct: 0,
		incorrect: 0
	}

	let undoStack: Array<{ correct: number; incorrect: number; score: number }> = [];

	const pushUndoStack = () =>{
		undoStack.push({ correct: counterParameter.correct, incorrect: counterParameter.incorrect, score: counterParameter.score });
	}

	const undo = () => {
		const pop = undoStack.pop();
		if (pop) {
			counterParameter.correct = pop.correct;
			counterParameter.incorrect = pop.incorrect;
			counterParameter.score = pop.score;
		}
	};

	const dispatch = createEventDispatcher();

	function deleteClick() {
		dispatch('delete', order);
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

    {#if gameParameter.rule === Rule.simple || gameParameter.rule === Rule.updown || gameParameter.rule === Rule.swedish}
        <SimpleCounter rule={gameParameter.rule} bind:counterParameter on:changed={pushUndoStack} />
    {:else if gameParameter.rule === Rule.mn}
        <ScoreCounter {gameParameter} bind:counterParameter on:changed={pushUndoStack} />
	{:else if gameParameter.rule === Rule.by}
		<ScoreCounter {gameParameter} bind:counterParameter on:changed={pushUndoStack} />
	{:else if gameParameter.rule === Rule.divide}
		<ScoreCounter {gameParameter} bind:counterParameter on:changed={pushUndoStack} />
    {/if}
</Card>
