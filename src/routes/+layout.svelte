<script lang="ts">
	import { RuleType, ruleName } from '$lib/definitions/rules';
	import { nByMGoalScore, nByMParameters, ruleSet } from '$lib/state/state.svelte';
	import type { Snippet } from 'svelte';
	import '../app.postcss';

	let { children }: { children: Snippet } = $props();

	const title = $derived.by(() => {
			switch (ruleSet.rule) {
				case RuleType.mn:
					return `+${ruleSet.whenCorrect}/${ruleSet.whenIncorrect}`;
				case RuleType.by:
					return `${nByMParameters.n} by ${nByMParameters.m} (${nByMGoalScore()})`;
				case RuleType.backstream:
					return ruleSet.whenIncorrect == -1 ? 'Backstream -n' : `Backstream ${ruleSet.whenIncorrect}n`;
				default:
					return ruleName(ruleSet.rule);
			}
		}
	);
</script>

<title>Quiz Counter</title>
<div class="flex justify-center align-middle mb-4 p-1" style="background-color:lightsteelblue;">
	<h1 class="text-3xl">{title}</h1>
</div>
{@render children()}
