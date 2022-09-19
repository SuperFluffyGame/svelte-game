<script lang="ts">
    import LargeItem from "$lib/components/LargeItem.svelte";
    import { supabase } from "$lib/supabase";
    import { onMount } from "svelte";
    import { each } from "svelte/internal";
    import type { EquippedItems, Item } from "$lib/game/inventory/initSetup";
    import EmptyLargeItem from "$lib/components/EmptyLargeItem.svelte";

    let invenLoaded = false;
    let invenError: string | null = null;

    let name = "Loading...";
    let equipped: EquippedItems | null = null;
    onMount(async () => {
        name = localStorage.getItem("USERNAME") ?? "Something went wrong";

        const equippedItemsRes = await supabase
            .from("inventory")
            .select("equipped")
            .single();

        if (equippedItemsRes.error) {
            invenError = equippedItemsRes.error.message;
        }
        equipped = equippedItemsRes.data?.equipped as EquippedItems;
        invenLoaded = true;
    });
</script>

<div class="container">
    <div class="equipped">
        {#if equipped?.helmet.id && invenLoaded}
            <LargeItem
                name={equipped?.helmet.id}
                count={equipped?.helmet.count}
                power={0}
                cost={0}
                rating={1}
                icon="n"
            />
        {:else}
            <EmptyLargeItem icon="" name="Helmet" />
        {/if}
        {#if equipped?.chestplate.id && invenLoaded}
            <LargeItem
                name={equipped?.chestplate.id}
                count={equipped?.chestplate.count}
                power={0}
                cost={0}
                rating={1}
                icon="n"
            />
        {:else}
            <EmptyLargeItem icon="" name="Chestplate" />
        {/if}
        {#if equipped?.leggings.id && invenLoaded}
            <LargeItem
                name={equipped?.leggings.id}
                count={equipped?.leggings.count}
                power={0}
                cost={0}
                rating={1}
                icon="n"
            />
        {:else}
            <EmptyLargeItem icon="" name="Leggings" />
        {/if}
    </div>
    <div class="divider" />
    <div class="categories">
        <div class="category">
            <h2 class="category-title">Weapons/Tools</h2>
        </div>
        <div class="divider" />

        <div class="category">
            <h2 class="category-title">Armor</h2>
        </div>
        <div class="divider" />

        <div class="category">
            <h2 class="category-title">Crafting</h2>
        </div>
        <div class="divider" />

        <div class="category">
            <h2 class="category-title">Upgrading</h2>
        </div>
    </div>
</div>

<style>
    .categories {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
    }
    .category {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        /* justify-content: center; */
    }
    .category-title {
        text-align: center;
        margin-top: 1rem;
    }

    h2 {
        margin: 0;
    }
    .container {
        flex-grow: 1;
        display: flex;
    }
    .equipped {
        padding: 1rem;
        width: 18rem;
        height: fit-content;
        display: grid;
        grid-template-columns: auto auto;
        gap: 1rem;
    }
    .divider {
        width: 0.1rem;
        background-color: var(--bl5);
    }

    @media screen and (max-width: 1000px) {
        .categories {
            flex-direction: column;
        }
        .category {
            min-height: 15rem;
        }
        .category-title {
            text-align: left;
        }
        .divider {
            height: 0.1rem;
            width: auto;
            background-color: var(--bl5);
        }
    }
</style>
