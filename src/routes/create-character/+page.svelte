<script lang="ts">
    import "../../app.css";
    import { goto } from "$app/navigation";
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";
    import accountIcon from "$lib/assets/account.svg";
    import { createCharacter, type Icon } from "$lib/api";

    onMount(async () => {
        const userRes = await supabase.auth.getUser();
        if (userRes.error) {
            goto("/auth/signin");
            return;
        }
    });
    let error = false;
    let feedback: string | null = null;

    let name = "";
    let selectedIcon = "";

    let customIconSrc = "";
    let files: FileList;
    $: firstFile = files?.item(0);
    $: if (firstFile) {
        const reader = new FileReader();
        reader.readAsDataURL(firstFile);

        reader.onload = () => {
            customIconSrc = reader.result as string;
        };
    }

    const _submit = async () => {
        const icon: Icon = {
            type: selectedIcon == "custom" ? "custom" : "builtin",
            data: selectedIcon == "custom" ? customIconSrc : selectedIcon,
        };
        const res = await createCharacter(name, icon);
        if (res.error) {
            error = true;
            feedback = res.error;
        } else {
            error = false;
            feedback = res.status;
            goto("/game");
        }
    };
    const logout = async () => {
        await supabase.auth.signOut();
        goto("/auth/signin");
    };
</script>

<div class="container">
    <form on:submit|preventDefault={_submit}>
        <h1 class="title">Character Creation</h1>
        <input
            type="username"
            name="username"
            id="username"
            class="text-input"
            placeholder="Username"
            bind:value={name}
        />
        <div class="character-select-container">
            <div class="character">
                <img src={accountIcon} alt="" class="character-icon" />
                <input
                    type="radio"
                    name="icon"
                    class="select"
                    required
                    on:change={e => {
                        selectedIcon = "account";
                    }}
                    selected
                />
            </div>
            <div class="character selectable-file">
                <img src={customIconSrc} alt="" class="character-icon" />

                <input
                    type="radio"
                    name="icon"
                    class="select"
                    on:change={e => {
                        selectedIcon = "custom";
                    }}
                />

                <button class="file-button blue-button">
                    <input
                        type="file"
                        name="icon"
                        class="file-upload"
                        bind:files
                    />Upload</button
                >
            </div>
        </div>
        <button type="submit" class="create-button blue-button">Create</button>
        <button class="text-button" on:click={logout}>Sign Out</button>

        <p class="feedback" class:red={error} class:lime={!error}>
            {feedback ?? " "}
        </p>
    </form>
</div>

<style>
    form {
        position: relative;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        --icon-size: 5rem;
    }

    .character-select-container {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .character {
        position: relative;
        width: var(--icon-size);
        height: var(--icon-size);
        padding: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--bl6);
    }

    .character-icon {
        width: var(--icon-size);
    }

    .select {
        margin: 0;
        appearance: none;
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;

        border: 0.1rem solid black;
        transition: border-width 50ms linear;
    }
    .select:checked {
        border-width: 0.25rem;
    }

    .file-upload {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }

    .file-button {
        position: relative;
    }

    .selectable-file {
        width: calc(var(--icon-size) * 2 + 1rem);
        gap: 1rem;
    }

    @media screen and (max-width: 600px) {
        .character-select-container {
            flex-direction: column;
        }
    }
</style>
