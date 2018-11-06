<template>
  <div>
    <div v-if="$route.name==='intheater'" class="btn" :class="{ pre: !globalReleased }">
      <span class="fix">
        <slot></slot>
      </span>
    </div>
    <div v-else class="btn" :class="{ pre: showst===4, 'toggle-wish-btn': showst === 1}">
      <span class="fix">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    globalReleased: Boolean,
    showst: Number
  }
}
</script>

<style lang="stylus" scoped>
.btn.toggle-wish-btn
  background-color #faaf00 !important
</style>


