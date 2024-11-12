<template>
  <div class="headerBar">
    <div class="icon">
      <HamburgerIcon />
    </div>
  </div>
</template>

<script lang="js" setup>
import HamburgerIcon from './HamburgerIcon.vue';

</script>
<style lang="scss" scoped>
.headerBar {
  width: 100%;
  background-color: rgb(156, 4, 4);
  height: 60px;

  .icon {
    padding: 5px;
  }
}
</style>
