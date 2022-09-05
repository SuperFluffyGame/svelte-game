<script>
    import "../../app.css";
    import accountSvg from "$lib/assets/account.svg";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let name = "Loading...";
    let pageName = $page.url.pathname;
    if (pageName.startsWith("/")) {
        pageName = pageName.slice(1);
    }
    onMount(() => {
        if (!localStorage.getItem("USERID")) {
            goto("/");
        }
        name = localStorage.getItem("USERNAME") ?? "Something went wrong";
    });
</script>

<div class="container">
    <div class="topbar">
        <h1 class="title">Title</h1>
        <div class="account">
            <p class="name">{name}</p>
            <a href="/game/account">
                <img src={accountSvg} alt="account icon" class="account-icon" />
            </a>
        </div>
    </div>
    <div class="page-tab-container">
        <div class="page-tab" class:selected={pageName == "character"}>
            <a href="/character">CHARACTER</a>
        </div>
        <div class="page-tab" class:selected={pageName == "inventory"}>
            <a href="/inventory">INVENTORY</a>
        </div>
        <div class="page-tab" class:selected={pageName == "gathering"}>
            <a href="/gathering">GATHERING</a>
        </div>
        <div class="page-tab" class:selected={pageName == "combat"}>
            <a href="/combat">COMBAT</a>
        </div>
        <div class="page-tab" class:selected={pageName == "pvp"}>
            <a href="/pvp">PvP</a>
        </div>
        <div class="page-tab" class:selected={pageName == "dungeons"}>
            <a href="/dungeons">DUNGEONS</a>
        </div>
        <div class="page-tab" class:selected={pageName == "trading"}>
            <a href="/trading">TRADING</a>
        </div>
        <div class="page-tab" class:selected={pageName == "factions"}>
            <a href="/factions">FACTIONS</a>
        </div>
        <div class="page-tab" class:selected={pageName == "leaderboards"}>
            <a href="/leaderboards"> LEADERBOARDS</a>
        </div>
    </div>
</div>

<slot />

<style>
    .container {
        position: sticky;
    }
    .selected {
        background-color: var(--bl4);
    }

    .page-tab-container {
        height: 2rem;
        border-bottom: 0.2rem solid var(--b9);
        background-color: var(--bl2);
        display: flex;
        align-items: stretch;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: var(--bl5) transparent;
    }

    .page-tab {
        display: flex;
        align-items: center;
        justify-content: center;

        font-family: monospace;
        font-size: 1.25rem;
        padding-block: 0.25rem;
        padding-inline: 1.5rem;
        border-left: 0.2rem solid var(--b5);

        flex: 1 1 0;
        flex-grow: 1;
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
