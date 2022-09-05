<script lang="ts">
    import { onMount } from "svelte";

    let name = "Loading...";
    onMount(() => {
        name = localStorage.getItem("USERNAME") ?? "Something went wrong";
    });
</script>

<div class="container">
    <div class="left">
        <h2 class="name">{name}</h2>
        <hr class="name-divider" />
    </div>
    <div class="stats">stats</div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    .name {
        margin: 1rem;
        margin-bottom: 0;
    }
    .name-divider {
        margin-bottom: 1rem;
        margin-inline: 1rem;
    }

    .container {
        display: flex;
        height: 100%;
        align-items: stretch;
    }

    .left {
        margin: 1rem;
        border-radius: 1rem;
        background-color: var(--bl5);
        width: 20rem;
    }
</style>
