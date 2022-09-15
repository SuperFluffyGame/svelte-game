<script>
    import { jwtFetch } from "$lib/api";
    import Counter from "$lib/components/Counter.svelte";
    import { onMount } from "svelte";

    let text = "";
</script>

<div class="container">
    <Counter />
    <p>{text}</p>
</div>

<style>
    .container {
        color: var(--accent-color);
        padding: 1rem;
        min-height: 100%;
    }
</style>
