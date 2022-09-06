<script lang="ts">
    import { onMount } from "svelte";
    import type { Item } from "./data";
    import Star from "./Star.svelte";

    export let name: string;
    export let count: number;
    export let rating: number;
    export let cost: number;
    export let power: number;
</script>

<div class="container">
    <div class="left">
        <img class="icon" src="" alt=" " />
        <h4>{name}</h4>
    </div>
    <div class="divider" />
    <div class="right">
        <div class="stars">
            {#each Array(rating) as _}
                <Star />
            {/each}
        </div>
    </div>
</div>

<style>
    .divider {
        border: 1px solid black;
    }

    * {
        margin: 0;
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .container {
        position: relative;
        background-color: var(--bl7);
        margin: 1rem;
        border-radius: 0.4rem;
        height: 4rem;
        width: 10rem;
        padding: 0.5rem;

        font-family: monospace;
        font-size: 1rem;

        display: flex;
        gap: 0.5rem;
    }

    .icon {
        border: 0.1rem solid black;
        aspect-ratio: 1 / 1;
        max-height: 3rem;
    }

    .right {
        display: flex;
        flex-direction: column;
    }
</style>
