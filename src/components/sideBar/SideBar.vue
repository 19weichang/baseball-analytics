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
      <el-menu v-for="route in routes" :key="route.meta.title">
        <el-menu-item
          class="routerTitle"
          v-if="route.meta.title && route.meta.hide !== true"
          :index="route.path"
          @click="handleClose"
        >
          {{ route.meta.title }}
        </el-menu-item>
      </el-menu>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  show: {
    type: Boolean
  }
})

const emits = defineEmits(['close'])

const routes = ref()
const router = useRouter()

watch(
  () => props.show,
  () => {
    routes.value = router.getRoutes()
  }
)

function handleClose() {
  emits('close')
}
</script>

<style lang="scss" scoped>
.sidebar {
  :deep(.el-drawer) {
    width: 300px !important;
    border-right: 1px var(--commonBorderColor) solid;
    box-shadow: none;

    .el-drawer__container {
      width: 100%;
    }

    .el-menu {
      border: none;
    }

    .el-drawer__body {
      padding: 0;
      background-color: var(--sideBarBackgroundColor);

      ul {
        background-color: var(--sideBarBackgroundColor);

        .el-sub-menu__title {
          color: var(--sideBarTextColor);

          &:hover {
            color: var(--sideBarHoverTextColor);
          }
        }

        .el-menu-item {
          color: var(--sideBarTextColor);

          &:hover {
            color: var(--sideBarHoverTextColor);
          }
        }

        .routerTitle {
          font-size: 20px;
          font-weight: 700;
        }

        .childTitle {
          font-size: 16px;
          font-weight: 500;
        }

        .is-disabled {
          &:hover {
            color: var(--sideBarTextColor);
          }
        }
      }
    }
  }
}
</style>
