<template>
  <div class="btn" :class="{ pre: preShow }">
    <span class="fix" data-bid="dp_wx_home_movie_btn">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    preShow: Boolean
  }
}
</script>

