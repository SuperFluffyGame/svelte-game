<script lang="ts">
    import { goto } from "$app/navigation";
    import type { LoginStatus } from "$lib/register";
    import { onMount } from "svelte";
    import { title } from "$lib/util";

    let userid = "";

    let error = false;
    let statusMsg = "";

    onMount(() => {
        if (localStorage.getItem("USERID")) {
            goto("/game");
        }
    });

    const login = async () => {
        const res = await fetch(`/api/login?id=${userid}`);
        const status: LoginStatus = await res.json();

        if (status.error) {
            error = true;
            statusMsg = status.statusMsg;
            return;
        }

        localStorage.setItem("USERNAME", status.username!);
        localStorage.setItem("USERID", userid);
        goto("/game");
    };
</script>

<div class="container">
    <div class="signin">
        <h1 class="title">{title}</h1>
        <input type="text" name="id" placeholder="UserID" bind:value={userid} />
        <button class="blue-button" on:click={login}>Log In</button>
        <a class="register" href="/register">Register</a>
        <p class="feedback" class:red={error} class:lime={!error}>
            {statusMsg}
        </p>
    </div>
</div>

<style>
    h1,
    p {
        margin: 0;
    }
    .lime {
        color: limegreen;
    }
    .red {
        color: red;
    }

    .feedback {
        position: absolute;
        bottom: 1rem;
        font-family: monospace;
        font-size: 1rem;
        text-align: center;
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
