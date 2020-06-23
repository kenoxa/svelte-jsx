<script>
  export let items = []
</script>

<slot name="header" {items} />

<ul>
  {#each items as item}
    <li>
      <slot {item} {items}>{item}</slot>
    </li>
  {/each}
</ul>

<slot name="footer" {items} />
