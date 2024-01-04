<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { CounterType, RuleType, counterType } from '$lib/definitions/rules';
	import { inicialPoint, nByMParameters, rule } from '$lib/store/store';
	import { Card, CloseButton, Input } from 'flowbite-svelte';
	import { ArrowsRepeatSolid } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';
	import ScoreCounter from './scoreCounter.svelte';
	import SimpleCounter from './simpleCounter.svelte';
	import SwedishCounter from './swedishCounter.svelte';

	export let counterParameter: CounterParameters 

	const dispatch = createEventDispatcher()

	const deleteClick = () => {
		dispatch('delete', counterParameter.id);
	}

	export const reset = () => {
		dispatch('changed', counterParameter.id)

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
	}

	// HACK
	$: counter =  counterType($rule) === CounterType.score ? ScoreCounter : counterType($rule) === CounterType.swedish ? SwedishCounter : SimpleCounter
</script>

<Card>
	<div class="flex justify-end items-center gap-4">
		<ArrowsRepeatSolid  on:click={reset} />
		<CloseButton on:click={deleteClick} />
	</div>

	<Input bind:value={counterParameter.name} placeholder="Name?" class="text-2xl text-center m-2" />

	<svelte:component this={counter} bind:counterParameter on:changed />
</Card>
