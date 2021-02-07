<script>
  export let propsToInspect = []
  export let inspect = function inspect() {}

  propsToInspect.map((name) => inspect({ [name]: $$props[name] }))
</script>
