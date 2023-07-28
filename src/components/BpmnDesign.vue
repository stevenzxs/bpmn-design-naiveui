<template>
  <n-layout has-sider sider-placement="left" class="bpmndesign">
    <n-layout-sider
        collapse-mode="width"
        :collapsed-width="15"
        :width="240"
        :native-scrollbar="true"
        :show-collapsed-content="false"
        show-trigger="arrow-circle"
        content-style="padding: 10px;"
        bordered
      >
      <n-list hoverable clickable>
        <template #header>
           组件
        </template>
        <n-list-item v-for="(n,index) in listNodes">
          <div :key="n" 
                draggable="true" 
               :data-node="n.item" 
               @dragstart="drag($event)" 
                class="drag-drawflow">
                <icon-node :icon-name="n.icon" />
              {{ n.name }}
          </div>
        </n-list-item>
      </n-list>
      </n-layout-sider>
      <n-layout-content content-style="padding: 0px;">
        <div id="drawflow" style="min-width:100vh;height: 100vh;"
          @drop="drop($event)" @dragover="allowDrop($event)"></div>
      </n-layout-content>
</n-layout>
</template>
<script>
import Drawflow from '@/utils/flow.js'
import { onMounted, shallowRef, h, getCurrentInstance, render, readonly, ref  } from "vue"
import { NIcon } from "naive-ui"

import IconNode from '@/components/utils/IconNode.vue';
import NodeStart from '@/components/nodes/NodeStart.vue'
import NodeEnd from '@/components/nodes/NodeEnd.vue'
import NodeUser from '@/components/nodes/NodeUser.vue'

export default {
  name:'bpmndesign',
  components: {
    NodeStart,
    IconNode
  },
setup() {
   const listNodes = readonly([
        {
            name: '开始',
            color: '#49494970',
            item: 'NodeStart',
            icon: 'EllipseOutline',
            input:0,
            output:1
        },
        {
            name: '结束',
            color: 'blue',
            item: 'NodeEnd',
            icon: 'Ellipse',
            input:1,
            output:2
        },
         {
            name: '用户任务',
            color: '#ff9900',
            item: 'NodeUser',
            icon: 'ManOutline',
            input:1,
            output:0
        }
    ])
   
   const editor = shallowRef({})
   const dialogVisible = ref(false)
   const dialogData = ref({})
   const Vue = { version: 3, h, render };
   const internalInstance = getCurrentInstance()
   internalInstance.appContext.app._context.config.globalProperties.$df = editor;
   
    function exportEditor() {
      dialogData.value = editor.value.export();
      dialogVisible.value = true;
    }

    const drag = (ev) => {
      if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
      } else {
      ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
      }
    }
    const drop = (ev) => {
      if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if(parentdrawflow != null) {
          addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
      } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
      }

    }
    const allowDrop = (ev) => {
      ev.preventDefault();
    }

   let mobile_item_selec = '';
   let mobile_last_move = null;
   function positionMobile(ev) {
     mobile_last_move = ev;
   }

    function addNodeToDrawFlow(name, pos_x, pos_y) {
      pos_x = pos_x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)));
      pos_y = pos_y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)));
    
      const nodeSelected = listNodes.find(ele => ele.item == name);
      editor.value.addNode(name, nodeSelected.input,  nodeSelected.output, pos_x, pos_y, name, {}, name, 'vue');
      
    }
    onMounted(() => {

var elements = document.getElementsByClassName('drag-drawflow');
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener('touchend', drop, false);
  elements[i].addEventListener('touchmove', positionMobile, false);
  elements[i].addEventListener('touchstart', drag, false );
}
  
 const id = document.getElementById("drawflow");
 editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context);
 editor.value.start();
 
 editor.value.registerNode('NodeStart', NodeStart, {}, {});
 editor.value.registerNode('NodeEnd', NodeEnd, {}, {});
 editor.value.registerNode('NodeUser', NodeUser, {}, {});

 editor.value.import({"drawflow":
        {"Home":
          {"data":
              {"5":
                { "id":5,"name":"NodeEnd",
                  "data": {"script":"(req,res) => {\n console.log(req);\n}"},
                  "class":"NodeEnd","html":"NodeEnd","typenode":"vue",
                  "inputs":{"input_1":{"connections":[{"node":"6","input":"output_1"}]}},
                  "outputs":{"output_1":{"connections":[]},"output_2":{"connections":[]}},
                  "pos_x":1000,"pos_y":117
                },
              "6":{ "id":6,"name":"NodeStart","data":{"url":"localhost/add", "method": "post"},
                    "class":"NodeStart","html":"NodeStart","typenode":"vue",
                    "inputs":{},
                    "outputs":{"output_1":{"connections":[{"node":"5","output":"input_1"}]}},
                    "pos_x":137,"pos_y":89}
              }
          }
        }})
})

return {
  exportEditor, listNodes, drag, drop, allowDrop, dialogVisible, dialogData
}

}

}
</script>
<style scoped lang="less">
.bpmndesign{

}
</style>
