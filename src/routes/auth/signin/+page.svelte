<script lang="ts">
    import { EmailInUse, Registered, title } from "$lib/texts";
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";

    let error = false;
    let feedback: null | string = null;
    let email = "";
    let password = "";
    let username = "";
    let showPassword = false;

    const signup = async () => {
        const res = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (res.error) {
            console.error(res);
            return;
        }

        goto("/game");
    };

    const handlePasswordInput = (e: Event) => {
        password = (e.target as any).value;
    };
</script>

<form class="signin" on:submit|preventDefault={signup}>
    <h1 class="title">{title}</h1>

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
        <a href="/auth/signup">Sign Up</a>
    </div>
    <!-- <a class="sign" href="/register">Register</a> -->
    <p class="feedback" class:red={error} class:lime={!error}>
        {feedback ?? " "}
    </p>
</form>

<style>
    h1 {
        margin: 0;
    }
    .signin {
        position: relative;
        width: max(20rem, 50vw);
        height: max(25rem, 50vh);
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
    .text-input {
        appearance: none;
        outline: none;
        border: none;
        color: var(--accent-color);
        font-size: 1.25rem;
        background-color: var(--bl5);
        height: 2rem;
        width: 25rem;
        padding-block: 0.25rem;
        padding-inline: 0.5rem;
    }

    .red {
        color: red;
    }
    .lime {
        color: lime;
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
