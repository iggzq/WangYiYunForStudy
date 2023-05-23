<template>
  <div>
    <ItemMusicTop :playlist="state.playList" />
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playList.subscribedCount"/>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList ,getMusicItemListDetail} from "@/request/api/Item.js";
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import ItemMusicList from "@/components/item/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playList: {},
      //歌单的歌曲对象
      itemList:[],
    });
    onMounted(async () => {
      let id = useRoute().query.id;
      let res = await getMusicItemList(id);
      let result = await getMusicItemListDetail(id);
      state.itemList = result.data.songs
      state.playList = res.data.playlist;
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
};
</script>

<style>
</style>