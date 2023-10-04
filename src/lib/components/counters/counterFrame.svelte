<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { CounterType, RuleType, counterType } from '$lib/definitions/rules';
	import { inicialPoint, nByMParameters, rule } from '$lib/store/store';
	import { Button, Card, CloseButton } from 'flowbite-svelte';
	import { ArrowsRepeatSolid, UndoOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import ScoreCounter from './scoreCounter.svelte';
	import SimpleCounter from './simpleCounter.svelte';

	export let order: number;

	const dispatch = createEventDispatcher();

	function deleteClick() {
		dispatch('delete', order);
	}

	export const reset = () => {
		switch ($rule) {
			case RuleType.by:
				counterParameter.score = 0;
				counterParameter.correct = 0;
				counterParameter.incorrect = $nByMParameters.m;
				break;
			case RuleType.divide:
				counterParameter.score = $inicialPoint;
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
	};

	let undoStack: Array<{ correct: number; incorrect: number; score: number }> = [];

	const pushUndoStack = () => {
		undoStack.push({
			correct: counterParameter.correct,
			incorrect: counterParameter.incorrect,
			score: counterParameter.score
		});
	};

	const undo = () => {
		const pop = undoStack.pop();
		if (pop) {
			counterParameter.correct = pop.correct;
			counterParameter.incorrect = pop.incorrect;
			counterParameter.score = pop.score;
		}
	};

	$: counter = counterType($rule) === CounterType.score ? ScoreCounter : SimpleCounter;
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

	<input placeholder="Name?" class="text-3xl text-center m-2" />

	<svelte:component this={counter} bind:counterParameter on:changed={pushUndoStack} />
</Card>
