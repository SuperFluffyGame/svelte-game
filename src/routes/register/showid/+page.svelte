<script lang="ts">
    import { goto } from "$app/navigation";

    import { onMount } from "svelte";
    let id = "loading...";

    onMount(() => {
        id = localStorage.getItem("USERID")!;
    });
</script>

<div class="container">
    <div class="signin">
        <h2>Your UserID:</h2>
        <h3>{id}</h3>
        <p>Write it down. This is how you login.</p>
        <button class="blue-button" on:click={() => goto("/game")}
            >Continue</button
        >
    </div>
</div>

<style>
    h2,
    h3,
    p {
        margin: 0;
    }

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .signin {
        position: relative;
        width: max(20rem, 50vw);
        height: max(20rem, 50vh);
        background-color: var(--bl1);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .signin *:not(:first-child) {
        margin-top: 1rem;
    }
</style>
