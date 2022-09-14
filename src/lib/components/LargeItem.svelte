<script lang="ts">
    import "../../app.css";
    import Stars from "./Stars.svelte";
    export let count: number;
    export let power: number;
    export let rating: number;
    export let cost: number;
    export let name: string;
    export let icon: string;

    count;
    name;
    power;
    rating;
    cost;
    icon;
</script>

<div class="container">
    <img src={icon} alt=" " class="icon" />

    <div class="stars">
        <Stars n={5} size={1.15} />
    </div>
    <p class="name">{name}</p>
</div>

<style>
    p {
        margin: 0;
    }

    .container {
        width: 8rem;
        height: 8rem;
        background-color: var(--bl5);
        border-radius: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        border: 0.2rem solid var(--bl1);
    }

    .icon {
        background-color: black;
        width: 4rem;
        aspect-ratio: 1;
        margin-top: 0.5rem;
    }
    .name {
        font-size: 1.15rem;
        margin: 0.25rem;
    }
    .stars {
        display: flex;
        align-items: flex-end;
        flex-grow: 1;
    }
</style>
