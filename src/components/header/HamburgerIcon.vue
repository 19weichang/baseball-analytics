<template>
  <div class="hamburger" @click="toggleMenu('toggle')">
    <span class="bar"></span>
  </div>

  <SideBar :show="showSidebar" @close="handleClose" />
</template>

<script setup>
import SideBar from '@/components/sideBar/SideBar.vue'

const showSidebar = ref(false)
const openMenu = ref('translateX(100%)')
const openUserMenuMedia = ref('translateX(100%)')
const barColor = ref('white')
const beforeTop = ref('-.8rem')
const beforeTransform = ref('rotate(0deg)')
const afterTop = ref('.8rem')
const afterTransform = ref('rotate(0deg)')

function toggleMenu(action) {
  if (action === 'toggle') {
    showSidebar.value = !showSidebar.value
    if (showSidebar.value) {
      barColor.value = 'transparent'
      beforeTop.value = '0'
      beforeTransform.value = 'rotate(135deg)'
      afterTop.value = '0'
      afterTransform.value = 'rotate(-135deg)'
    } else {
      barColor.value = 'white'
      beforeTop.value = '-.8rem'
      beforeTransform.value = 'rotate(0deg)'
      afterTop.value = '.8rem'
      afterTransform.value = 'rotate(0deg)'
    }
  } else if (action === 'goRoute') {
    showSidebar.value = false
    barColor.value = 'white'
    beforeTop.value = '-.8rem'
    beforeTransform.value = 'rotate(0deg)'
    afterTop.value = '.8rem'
    afterTransform.value = 'rotate(0deg)'
  }
}

function handleClose() {
  showSidebar.value = false
  barColor.value = 'white'
  beforeTop.value = '-.8rem'
  beforeTransform.value = 'rotate(0deg)'
  afterTop.value = '.8rem'
  afterTransform.value = 'rotate(0deg)'
}
</script>

<style lang="scss" scoped>
$clickBtn: v-bind(openMenu);
$clickBtnMedia: v-bind(openUserMenuMedia);
$barColor: v-bind(barColor);
$beforeTop: v-bind(beforeTop);
$beforeTransform: v-bind(beforeTransform);
$afterTop: v-bind(afterTop);
$afterTransform: v-bind(afterTransform);
.hamburger {
  height: 3rem;
  width: 3rem;
  border-radius: 0.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  &:hover {
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  .bar {
    width: 1.7rem;
    height: 2px;
    background-color: $barColor;
    display: inline-block;
    position: relative;
    transition: backgroud-color 0.5s;
    &:before,
    &:after {
      content: '';
      position: absolute;
      width: inherit;
      height: inherit;
      background-color: white;
      transition: all 0.5s;
    }
    &:before {
      top: $beforeTop;
      transform: $beforeTransform;
    }
    &:after {
      top: $afterTop;
      transform: $afterTransform;
    }
  }
}
</style>
