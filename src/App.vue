<template>
  <div>
    <router-view />
    <FooterMusic v-if="showFooterMusic" />
  </div>
</template>

<script>
import FooterMusic from '@/components/item/FooterMusic.vue'

export default {
  components: {
    FooterMusic
  },
  computed: {
    showFooterMusic() {
      const route = this.$route
      return route.meta && route.meta.showFooterMusic
    }
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.5rem;
  height: 0.5rem;
}
a {
  color: black;
}
div {
  font-family: "SmileySans"; //使用字体
}
</style>
