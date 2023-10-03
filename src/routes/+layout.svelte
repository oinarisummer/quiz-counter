<script>
	import { RuleType, ruleName } from '$lib/definitions/rules';
	import {
		nByMGoalScore,
		nByMParameters,
		rule,
		whenCorrect,
		whenIncorrect
	} from '$lib/store/store';
	import { derived } from 'svelte/store';
	import '../app.postcss';

	const title = derived(
		[rule, whenCorrect, whenIncorrect, nByMParameters, nByMGoalScore],
		([$rule, $whenCorrect, $whenIncorrect, $nByMParameters, $nByMGoalScore]) => {
			switch ($rule) {
				case RuleType.mn:
					return `+${$whenCorrect}/${$whenIncorrect}`;
				case RuleType.by:
					return `${$nByMParameters.n} by ${$nByMParameters.m} (${$nByMGoalScore})`;
				case RuleType.backstream:
					return $whenIncorrect == -1 ? 'Backstream -n' : `Backstream ${$whenIncorrect}n`;
				default:
					return ruleName($rule);
			}
		}
	);
</script>

<div class="flex justify-center align-middle mb-4 p-1" style="background-color:lightsteelblue;">
	<h1 class="text-3xl">{$title}</h1>
</div>
<slot />
