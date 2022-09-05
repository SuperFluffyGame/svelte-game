<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    onMount(() => {
        if (localStorage.getItem("USERID")) {
            goto("/game");
        }
    });
</script>

<div class="container">
    <div class="signin">
        <h1 class="title">Title</h1>
        <input type="text" name="id" placeholder="UserID" />
        <button class="blue-button">Log In</button>
        <a class="register" href="/register">Register</a>
        <p class="error">|error|</p>
    </div>
</div>

<style>
    h1,
    p {
        margin: 0;
    }
    .error {
        position: absolute;
        bottom: 2rem;
        color: red;
        font-family: monospace;
        font-size: 1rem;
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

    input {
        appearance: none;
        outline: none;
        border: none;
        color: var(--accent-color);
        font-size: 1.25rem;
        background-color: var(--bl5);
        height: 2rem;
        width: 15rem;
        padding-block: 0.25rem;
        padding-inline: 0.5rem;
    }
</style>
