<!-- <template>
    <el-card shadow="never" class="!border-0">
        <ListHeader @refresh="getData" />
        <el-tree
            :data="tableData"
            :props="{ label: 'name', children: 'child' }"
            v-loading="loading"
            node-key="id"
            :default-expanded-keys="defaultExpandedKey"
        >
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <el-tag
                        size="small"
                        :type="data.menu ? 'primary' : 'info'"
                        >{{ data.menu ? "菜单" : "权限" }}</el-tag
                    >
                    <el-icon v-if="data.icon" :size="16" class="ml-2">
                        <component :is="data.icon" />
                    </el-icon>
                    <span>{{ data.name }}</span>

                    <div class="ml-auto tree-action" @click.stop="() => {}">
                        <el-switch
                            v-model="data.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="handleChange($event, data)"
                        >
                        </el-switch>
                        <el-button type="primary" link size="small"
                                >修改</el-button
                            >
                            <el-button type="primary" link size="small"
                                >增加</el-button
                            >
                            <el-button type="primary" link size="small"
                                >删除</el-button
                            >
                    </div>
                </div>
            </template>
        </el-tree>
    </el-card>
</template>

<script setup>
import { getRuleList, updateRuleStatus } from "@/api/rule";
import ListHeader from "@/components/ListHeader.vue";
import { useInitTable } from "@/composables/useCommon";
import { ref } from "vue";

const defaultExpandedKey = ref([]);

const { loading, tableData, getData } = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        tableData.value = res.list;
        defaultExpandedKey.value = res.list.map((o) => o.id);
    },
});

const handleChange = (event, data) => {
    updateRuleStatus(data.id, event)
    .then(res => {
        data.status = event
    })
}

</script>


<style>
.custom-tree-node {
    display: flex;
    flex: 1;
    align-items: center;
    font: 14px;
    padding-right: 8px;
}

.el-tree-node__content {
    padding: 20px 0;
}

.tree-action {
    @apply flex items-center;
    gap: 10px;
}
</style> -->

<template>
    <div>
        {{ count }}
        <el-button type="primary" size="default" @click="handle">点击</el-button>
        
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

let xi = ref(1);
let xis = 7;
let count = computed(() => {
    return xis * 2;
})

const handle = () => {
    xis = 20
    console.log(xis)
}

</script>