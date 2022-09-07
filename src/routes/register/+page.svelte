<script lang="ts">
    import type { UsernameStatus, RegisterStatus } from "$lib/register";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { title } from "$lib/util";

    let error = true;
    let statusMsg = "";

    let username = "";

    const register = async () => {
        updateStatus();
        if (!error) {
            const res = await fetch(`/api/register?name=${username}`);
            const registerStatus: RegisterStatus = await res.json();

            if (registerStatus.error) {
                error = true;
                statusMsg = registerStatus.statusMsg;
            }
            localStorage.setItem("USERID", registerStatus.userid!);
            localStorage.setItem("USERNAME", username);

            goto("/register/showid");
        }
        updateStatus();
    };

    const updateStatus = async () => {
        const res = await fetch(`../api/usernameStatus?name=${username}`);
        const status: UsernameStatus = await res.json();
        statusMsg = status.statusMsg;
        error = status.error;
    };

    onMount(() => {
        if (localStorage.getItem("USERID")) {
            goto("/game");
        }
    });
</script>

<div class="container">
    <div class="signin">
        <h1 class="title">{title}</h1>
        <input
            type="text"
            name="id"
            placeholder="Username"
            bind:value={username}
            on:input={updateStatus}
        />
        <button class="blue-button" on:click={register}>Register</button>
        <a class="login" href="/">Log In</a>
        <p class="feedback" class:red={error} class:lime={!error}>
            {statusMsg}
        </p>
    </div>
</div>

<style>
    .lime {
        color: limegreen;
    }
    .red {
        color: red;
    }
    h1,
    p {
        margin: 0;
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
