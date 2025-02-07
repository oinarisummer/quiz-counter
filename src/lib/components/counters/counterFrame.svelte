<script lang="ts">
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { CounterType, RuleType, counterType } from '$lib/definitions/rules';
	import { nByMParameters, ruleSet } from '$lib/state/state.svelte';
	import { Card, CloseButton, Input } from 'flowbite-svelte';
	import { ArrowsRepeatOutline } from 'flowbite-svelte-icons';
	import ScoreCounter from './scoreCounter.svelte';
	import SimpleCounter from './simpleCounter.svelte';
	import SwedishCounter from './swedishCounter.svelte';

	interface CounterFrameProps {
		counterParameter: CounterParameters
		deleted: (id: number) => void
		changed: (id: number) => void
	}
	
	let {counterParameter = $bindable(), deleted, changed}: CounterFrameProps = $props()

	const deleteClick = () => {
		deleted(counterParameter.id);
	}

	export const reset = () => {
		changed(counterParameter.id)

		switch (ruleSet.rule) {
			case RuleType.by:
				counterParameter.score = 0;
				counterParameter.correct = 0;
				counterParameter.incorrect = nByMParameters.m;
				break;
			case RuleType.divide:
				counterParameter.score = ruleSet.inicialPoint;
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
	const Counter = $derived(counterType(ruleSet.rule) === CounterType.score ? ScoreCounter : counterType(ruleSet.rule) === CounterType.swedish ? SwedishCounter : SimpleCounter)
</script>

<Card>
	<div class="flex justify-end items-center gap-4">
		<ArrowsRepeatOutline onclick={reset} />
		<CloseButton onclick={deleteClick} />
	</div>

	<Input bind:value={counterParameter.name} placeholder="Name?" class="text-2xl text-center m-2" />

	<Counter bind:counterParameter changed={(id) => changed(id)} />
</Card>
