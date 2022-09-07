<script lang="ts">
    import { onMount } from "svelte";
    import type { Item } from "../data";
    import { numberToString } from "../util";
    import Stars from "./Stars.svelte";

    export let name: string;
    export let count: number;
    export let rating: number;
    export let cost: number;
    export let power: number;
    export let icon: string;
</script>

<div class="container">
    <div class="top">
        <img class="icon" src={icon} alt=" " />
        <div class="top-right">
            <h4 class="name">{name}</h4>
            <div class="stars">
                <Stars n={rating} />
                <p class="count">x{numberToString(count)}</p>
            </div>
        </div>
    </div>

    <div class="bottom">
        <table class="stats">
            <tr>
                <td>Power:</td>
                <td>{numberToString(power)}</td>
            </tr>
            <tr>
                <td>Cost:</td>
                <td>{numberToString(cost)}</td>
            </tr>
        </table>
    </div>
</div>

<style>
    * {
        margin: 0;
    }
    .name {
        white-space: nowrap;
    }

    .top {
        display: flex;
        gap: 0.5rem;
    }
    .top-right {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .container {
        position: relative;
        background-color: var(--bl6);
        margin: 1rem;
        border-radius: 0.5rem;
        min-height: 4rem;
        width: 13rem;
        padding: 0.5rem;

        font-family: monospace;
        font-size: 1rem;

        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .icon {
        border: 0.1rem solid black;
        height: 2rem;
        aspect-ratio: 1 / 1;
    }

    .bottom {
        display: flex;
    }

    table {
        flex-grow: 1;
    }

    tr td:last-child {
        text-align: right;
    }

    .stars {
        display: flex;
    }

    .count {
        flex-grow: 1;
        text-align: right;
        font-weight: bold;
        color: lime;
    }
</style>
