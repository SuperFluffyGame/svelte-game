<script lang="ts">
    import "../../app.css";
    import Stars from "./Stars.svelte";
    export let name: string;
    export let icon: string;
</script>

<div class="container">
    <img src={icon} alt=" " class="icon" />

    <p class="name">{name}</p>
</div>

<style>
    .container {
        width: 8rem;
        height: 8rem;
        background-color: var(--bl5);
        border-radius: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        border: 0.2rem solid transparent;
    }

    .icon {
        width: 5rem;
        aspect-ratio: 1;
        margin-top: 0.5rem;
    }
    .name {
        font-size: 1.25rem;
        margin: 0.25rem;
    }
</style>
