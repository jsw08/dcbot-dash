<script lang=ts>
    const {data} = $props()
</script>

<div class="w-full h-full grid grid-cols-[repeat(auto-fit,300px)]">
    {#each data.images as image}
        <div>
            <img src="/sexy/{data.user}/{image}" alt={image}>
            <button>delete</button>
            <button>edit name</button>
        </div>
    {/each}
</div>