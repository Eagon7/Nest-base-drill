<script setup lang="ts">
import useStorage from '@/composables/hd/useStorage'
import Player from 'xgplayer'
const storage = useStorage()
const { url, urlList } = defineProps<{
  url: string
  urlList?: string[]
}>()
// ['b.mp4','c.mp4']
const player = ref<Player>()
const emit = defineEmits(['playNextVideo'])
//视频列表，不包括当前视频
const urls = urlList ? urlList.splice(urlList.findIndex((u) => url == u) + 1) : undefined
onMounted(() => {
  player.value = new Player({
    id: 'videoPlayer',
    autoplay: false,
    url,
    lang: 'zh-cn',
    fluid: true,
    // poster: '/images/poster.jpg',
    playbackRate: [1, 1.25, 1.5, 2],
    keyShortcut: 'on',
    defaultPlaybackRate: storage.get('playbackrateChange', 1),
    playNext: urls && urls.length ? { urlList: urls } : undefined,
    'x5-video-orientation': 'portraint',
  })

  //播放下一个
  player.value.on('playerNext', (index) => {
    emit('playNextVideo', urls ? urls[index - 1] : undefined)
  })

  //更改播放速度
  player.value.on('playbackrateChange', function (v) {
    storage.set('playbackrateChange', v.to)
  })
})
defineExpose({
  player,
})
</script>

<template>
  <main class="">
    <div id="videoPlayer" class="z-0"></div>
  </main>
</template>
