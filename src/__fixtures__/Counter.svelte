<script>
  export let initialCount = 0
  let count = initialCount

  function handleClick() {
    count += 1
  }
</script>

<button on:click on:click={handleClick}>
  <slot {count}>Count is {count}</slot>
</button>
