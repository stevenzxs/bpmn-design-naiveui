<script setup>
import { Icon } from '@vicons/utils'
import { ref,markRaw,onMounted,watch } from 'vue' 

const props = defineProps({
  iconName: { type:String, default:'' },
  color: { type:String, default:'' },
  size: { type:[Number,String],default: 12 } 
})

</script>

<template>
  <Icon class="icon-c" :color="color" :size="size">
    <component :is="$ionicons5[iconName]" />
  </Icon>
</template>

<style lang="less">
.icon-c{
    margin:0px 12px; 
}
</style>
