<script lang="ts">
    import * as Texts from "$lib/texts";
    import { goto } from "$app/navigation";
    import { signin } from "$lib/auth";

    let error = false;
    let feedback: null | string = null;
    let email = "";
    let password = "";
    let showPassword = false;

    const _signin = async () => {
        const res = await signin(email, password);
        if (res.error) {
            error = true;
            feedback = res.error;
            return;
        }
        goto("/game");
    };

    const handlePasswordInput = (e: Event) => {
        password = (e.target as any).value;
    };
</script>

<form class="signin" on:submit|preventDefault={_signin}>
    <h1 class="title">{Texts.Title}</h1>

    <input
        class="text-input"
        type="email"
        autocomplete="email"
        name="email"
        placeholder="Email"
        bind:value={email}
    />
    <input
        class="text-input"
        type={showPassword ? "text" : "password"}
        autocomplete="current-password"
        name="password"
        placeholder="Password"
        maxlength={20}
        on:input={handlePasswordInput}
    />
    <button
        class="text-button"
        type="button"
        on:click={() => (showPassword = !showPassword)}
        >{showPassword ? "Hide" : "Show"} Password</button
    >
    <div class="continue-buttons">
        <button type="submit" class="blue-button">Sign In</button>
        <a href="/auth/signup" class="text-button">Sign Up</a>
    </div>
    <!-- <a class="sign" href="/register">Register</a> -->
    <p class="feedback" class:red={error} class:lime={!error}>
        {feedback ?? " "}
    </p>
</form>

<style>
    .signin {
        position: relative;
        width: 30rem;
        height: 30rem;
        background-color: var(--bl1);
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .signin > *:not(:first-child) {
        margin-top: 1rem;
    }

    .feedback {
        position: absolute;
        font-family: monospace;
        font-size: large;
        bottom: 0;
    }

    .continue-buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
    }
</style>
