<script lang="ts">
	import CounterFrame from '$lib/components/counters/counterFrame.svelte';
	import RuleSetting from '$lib/components/ruleSetting.svelte';
	import type { CounterParameters } from '$lib/definitions/parameters';
	import { RuleType } from '$lib/definitions/rules';
	import { nByMParameters, ruleSet } from '$lib/state/state.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import { ArrowsRepeatOutline, CogOutline, PlusOutline, UndoOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

  let counters: CounterParameters[] = $state(new Array());

	onMount(() => {
		addCard()
		undoStack = []
	})

	const inicialCard = (id: number): CounterParameters => {
		switch (ruleSet.rule) {
			case RuleType.by:
				return { id:id, score: 0, correct: 0, incorrect: nByMParameters.m }
			case RuleType.divide:
				return { id:id, score: ruleSet.inicialPoint, correct: 0, incorrect: 0 }
			default:
				return { id:id, score: 0, correct: 0, incorrect: 0 }
		}
	}

	const addCard = () => {
		counters = [...counters, inicialCard(counters.length + 1)]
	}

	const deleteCard = (id: number) => {
		counters = counters.filter((counter) => counter.id != id)
	}

	let undoStack: CounterParameters[] = $state(new Array())

	const pushUndoStack = (id: number) => {
		const changedCounter = counters.find((counters) => counters.id === id)
		if (changedCounter) {
			undoStack = [...undoStack, $state.snapshot(changedCounter)]	
		}
	}

	const undo = () => {
		const pop = undoStack.pop()
		if (pop) {
			counters = counters.map((counter) => {
				if (counter.id === pop.id) {
					return pop
				}
				return counter
			})
		}
	}

	const hasUndoStack = $derived(undoStack.length > 0);

	const allReset = () => {
		counters = counters.map((counter) => inicialCard(counter.id))
		undoStack = []
	}

	let popupModal = $state(false)
</script>

<div class="container mx-auto">
	<div class="flex justify-end align-middle gap-3 m-3">
		<Button type="button" outline={true} color="dark" onclick={undo} disabled={!hasUndoStack} >
			<UndoOutline />
		</Button>
		<Button type="button" outline={true} color="dark" onclick={allReset} >
			<ArrowsRepeatOutline />
		</Button>
		<button type="button" onclick={() => (popupModal = true)}><CogOutline /></button>
	</div>

	<div class="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each counters as _, index}
			<CounterFrame bind:counterParameter={counters[index]} changed={(id) => pushUndoStack(id)} deleted={(id) => deleteCard(id)} />
		{/each}
		<Button color="dark" outline={true} onclick={addCard}><PlusOutline /></Button>
	</div>
</div>

<Modal bind:open={popupModal} size="md" outsideclose><RuleSetting /></Modal>
