<script lang="ts">
    import emptyStar from "$lib/assets/empty-star.svg";
    import fullStar from "$lib/assets/full-star.svg";

    export let n: number;
    export let size: number;

    $: sizeRem = size + "rem";
</script>

{#each Array(5) as _, i}
    {#if i < n}
        <img
            src={fullStar}
            alt="star"
            style:width={sizeRem}
            style:height={sizeRem}
        />
    {:else}
        <img
            src={emptyStar}
            alt="star"
            style:width={sizeRem}
            style:height={sizeRem}
        />
    {/if}
{/each}
