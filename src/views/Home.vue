<script setup>

import { useStore } from "vuex"

const store = useStore()

</script>

<template>
    <div>
        后台首页
        {{ $store.state.user.username }}
    </div>
</template>
