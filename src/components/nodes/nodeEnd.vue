<template>
    <div ref="el">
        <nodeHeader  title="结束" icon-name="Ellipse" />
        <p>11</p>
    </div>  
</template>

<script>
import { defineComponent, onMounted, getCurrentInstance, readonly, ref, nextTick } from 'vue'
import nodeHeader from './nodeHeader.vue'

export default defineComponent({
    props: ['title'],
    components: {
        nodeHeader
    },
    setup() {
        const el = ref(null);
        const nodeId = ref(0);
        let df = null
        const url = ref('');
        const method = ref('get');
        const dataNode = ref({});
        const options = readonly([
            {
                value: 'get',
                label: 'GET'
            },
            {
                value: 'post',
                label: 'POST'
            }
        ]);
        
        df = getCurrentInstance().appContext.config.globalProperties.$df.value;

        const updateSelect = (value) => {
            dataNode.value.data.method = value;
            df.updateNodeDataFromId(nodeId.value, dataNode.value);
        }
        
        onMounted(async () => {
            await nextTick()
            nodeId.value = el.value.parentElement.parentElement.id.slice(5)
            dataNode.value = df.getNodeFromId(nodeId.value)
            
            url.value = dataNode.value.data.url;
            method.value = dataNode.value.data.method;
        });
        
        return {
            el, url, method, options, updateSelect
        }

    }    
})
</script>
