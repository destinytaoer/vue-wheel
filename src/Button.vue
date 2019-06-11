<template>
  <button class="g-button">按钮</button>    
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  .g-button {
    height: var(--btn-height);
    padding: 0 1em;
    border-radius: var(--border-raduis);
    border: 1px solid var(--border-color);
    font-size: var(--font-size);
    color: var(--color);
    background: var(--btn-bg);
    &:hover {
      background: var(--btn-hover-bg);
      border-color: var(--border-color-hover);
    }
    &:active {
      background: var(--btn-active-bg);
    }
    &:focus {
      outline: none;
    }
  }
</style>