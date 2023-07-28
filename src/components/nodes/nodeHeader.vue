<template>
    <div class="header">
        <IconNode :icon-name="iconName" />
        {{title}}
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import IconNode from '@/components/utils/IconNode.vue';
export default defineComponent({
    props: ['title','iconName'],
    components: {
        IconNode
    },
})
</script>

<style scoped>
div {
    background: #fff;
    margin-top: -15px;
    margin-left: -15px;
    margin-right: -15px;
    padding: 10px 15px;
    margin-bottom: 15px;
}
</style>