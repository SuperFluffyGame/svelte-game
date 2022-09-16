<script lang="ts">
    import "../../app.css";
    import accountSvg from "$lib/assets/account.svg";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import * as Texts from "$lib/texts";
    import { supabase } from "$lib/supabase";
    import { goto } from "$app/navigation";
    import type { Icon } from "$lib/api";

    $: pageName = $page.url.pathname.slice(6);
    let username = "Loading...";
    let iconSrc = "";

    onMount(async () => {
        const userRes = await supabase.auth.getUser();
        if (userRes.error) {
            goto("/auth/signin");
            return;
        }
        const usernameRes = await supabase
            .from("users")
            .select("username")
            .single();
        if (usernameRes.error || !usernameRes.data) {
            goto("/create-character");
        } else {
            username = usernameRes.data.username;
        }

        const iconRes = await supabase.from("users").select("icon").single();
        if (iconRes.error || !iconRes.data) {
            goto("/create-character");
        } else {
            const icon: Icon = iconRes.data.icon as any;
            if (icon.type == "custom") {
                iconSrc = icon.data;
            } else {
                switch (icon.data) {
                    case "account":
                    default: {
                        iconSrc = accountSvg;
                    }
                }
            }
        }
    });
</script>

<div class="container">
    <div class="topbar">
        <h1 class="title">{Texts.Title}</h1>
        <div class="account">
            <p class="name">{username}</p>
            <a href="/game/account">
                <img src={iconSrc} alt="" class="account-icon" />
            </a>
        </div>
    </div>
    <div class="page-tab-container">
        <div class="page-tab" class:selected={pageName == "character"}>
            <a href="/game/character">CHARACTER</a>
        </div>
        <div class="page-tab" class:selected={pageName == "inventory"}>
            <a href="/game/inventory">INVENTORY</a>
        </div>
        <div class="page-tab" class:selected={pageName == "gathering"}>
            <a href="/game/gathering">GATHERING</a>
        </div>
        <div class="page-tab" class:selected={pageName == "combat"}>
            <a href="/game/combat">COMBAT</a>
        </div>
        <div class="page-tab" class:selected={pageName == "pvp"}>
            <a href="/game/pvp">PvP</a>
        </div>
        <div class="page-tab" class:selected={pageName == "dungeons"}>
            <a href="/game/dungeons">DUNGEONS</a>
        </div>
        <div class="page-tab" class:selected={pageName == "trading"}>
            <a href="/game/trading">TRADING</a>
        </div>
        <div class="page-tab" class:selected={pageName == "factions"}>
            <a href="/game/factions">FACTIONS</a>
        </div>
        <div class="page-tab" class:selected={pageName == "leaderboards"}>
            <a href="/game/leaderboards">LEADERBOARDS</a>
        </div>
    </div>
</div>
<slot />

<style>
    .container {
        position: sticky;
        top: 0;
        left: 0;
    }
    .selected {
        background-color: var(--bl4);
    }

    .page-tab-container {
        min-height: 2rem;
        border-bottom: 0.2rem solid var(--b9);
        background-color: var(--bl3);
        display: flex;
        align-items: stretch;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--bl5) transparent;
    }
    .page-tab-container::-webkit-scrollbar {
        height: 0.4rem;
        width: 1rem;
        background-color: var(--bl2);
    }
    .page-tab-container::-webkit-scrollbar-thumb {
        background-color: var(--bl5);
    }

    .page-tab {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1rem;
        padding-inline: 1.5rem;
        border-left: 0.2rem solid var(--b5);

        flex: 1 1 0;
        min-width: 6rem;
    }

    .page-tab:last-child {
        border-right: 0.2rem solid var(--b5);
    }

    h1 {
        margin: 0;
    }

    .topbar {
        background-color: var(--bl1);
        display: flex;
        align-items: center;
        min-height: 4rem;
    }
    .title {
        margin: none;
        color: var(--accent-color);
        font-family: var(--main-font);
        padding: 0.75rem;
    }

    .account {
        height: 100%;
        flex-grow: 1;
        display: flex;
        justify-content: right;
        align-items: center;
        padding-right: 0.75rem;
    }
    .name {
        margin: 0;
        padding-right: 1rem;
    }

    .account-icon {
        width: 2rem;
    }
</style>
