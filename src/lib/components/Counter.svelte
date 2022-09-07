<script lang="ts">
    import { onMount } from "svelte";

    let c: number = 0;

    onMount(() => {
        c = localStorage.c ?? 0;
    });

    function increment() {
        c++;
        localStorage.c = c;
    }
</script>

<p>Count: {c}</p>
<button on:click={increment}>+</button>
