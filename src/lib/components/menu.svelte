<script lang="ts">
  import type { GameParameters, NbyMParameters } from '$lib/definitions/parameters';
  import { Rule, ruleName } from '$lib/definitions/rules';
  import { Accordion, AccordionItem, Button } from 'flowbite-svelte';

  export let gameParameter: GameParameters = {
    rule: Rule.simple,
    whenCorrect: 1,
    whenIncorrect: -1,
    inicialPoint: 0,
  };

  // for n by m
  export let nbyMParameter: NbyMParameters = {
    n: 10,
    m: 10
  };

  // for divide by n
  let divideInicialPoint = 10;
  let divideWhenCorrect = 10;

  let othersWhenCorect = 1;
</script>

<Accordion class="my-5">
    <AccordionItem>
        <span slot="header">{ruleName(Rule.simple)}</span>
        <div class="flex justify-end">
            <Button on:click={() => gameParameter.rule = Rule.simple}>submit</Button>
        </div>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">{ruleName(Rule.mn)}</span>
        <div class="flex items-center gap-3 m-3">
            <p>正解ポイント</p>
            <input type="number" style="width:4rem" bind:value={othersWhenCorect} />
            <p>誤答ポイント</p>
            <input type="number" style="width:4rem" bind:value={gameParameter.whenIncorrect} />
        </div>
        <div class="flex justify-end">
            <Button on:click={() => {gameParameter.rule = Rule.mn; gameParameter.whenCorrect = othersWhenCorect}}>submit</Button>
        </div>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">{ruleName(Rule.by)}</span>
        <div class="flex items-center gap-3 m-3">
            <p>N</p>
            <input type="number" style="width:4rem" bind:value={nbyMParameter.n} />
            <p>M</p>
            <input type="number" style="width:4rem" bind:value={nbyMParameter.m} />
        </div>
        <div class="flex justify-end">
            <Button on:click={() => {gameParameter.rule = Rule.by; gameParameter.whenCorrect = 1; gameParameter.whenIncorrect = -1}}>submit</Button>
        </div>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">{ruleName(Rule.updown)}</span>
        <div class="flex justify-end">
            <Button on:click={() => gameParameter.rule = Rule.updown}>submit</Button>
        </div>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">{ruleName(Rule.swedish)}</span>
        <div class="flex justify-end">
            <Button on:click={() => gameParameter.rule = Rule.swedish}>submit</Button>
        </div>
    </AccordionItem>
    <AccordionItem>
        <span slot="header">{ruleName(Rule.divide)}</span>
        <div class="flex items-center gap-3 m-3">
            <p>初期ポイント</p>
            <input type="number" style="width:4rem" bind:value={divideInicialPoint} />
            <p>正解ポイント</p>
            <input type="number" style="width:4rem" bind:value={divideWhenCorrect} />
        </div> 
        <div class="flex justify-end">
            <Button on:click={() => {gameParameter.rule = Rule.divide; gameParameter.whenCorrect = divideWhenCorrect; gameParameter.inicialPoint = divideInicialPoint}}>submit</Button>
        </div>
    </AccordionItem>
</Accordion>
