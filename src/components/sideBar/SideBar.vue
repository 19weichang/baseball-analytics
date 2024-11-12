<template>
  <div class="sidebar">
    <el-drawer
      class="drawerSidebar"
      :modelValue="props.show"
      modal-class="drawerSidebarModal"
      direction="ltr"
      :show-close="true"
      :close-on-press-escape="false"
      :before-close="handleClose"
      :with-header="true"
      size="90%"
    >
    
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  show: {
    type: Boolean
  }
})

const emits = defineEmits(['close'])

function handleClose() {
  emits('close')
}

</script>

<style lang="scss" scoped>
.sidebar {
  :deep(.drawerSidebarModal) {
    width: 100% !important;
    background-color: rgba(0, 0, 0, 0.0);
  }
}
</style>