<script lang="ts">
  import { Rule } from '$lib/definitions/rules';
  import { Accordion, AccordionItem, Button } from 'flowbite-svelte';

  export let rule: Rule;
  export let whenCorrect = 1;
  export let whenIncorrect = -1;
</script>

<Accordion class="my-3">
    <AccordionItem>
        <span slot="header">simple</span>
        <div class="flex justify-end">
            <Button on:click={() => rule = Rule.simple}>submit</Button>
        </div>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">+m/-n</span>
        <div class="flex justify-center align-middle gap-3 m-3">
            <p class="text-xl">correct</p>
            <input type="number" style="width:4rem" bind:value={whenCorrect} />
            <p class="text-xl">incorrect</p>
            <input type="number" style="width:4rem" bind:value={whenIncorrect} />
        </div>
        <div class="flex justify-end">
            <Button on:click={() => rule = Rule.mn}>submit</Button>
        </div>
    </AccordionItem>
</Accordion>
