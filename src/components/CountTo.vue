<template>
    {{ d.num.toFixed(0) }}
</template>

<script setup>
import gsap from "gsap";
import { reactive, watch } from "vue";

const props = defineProps({
    value: {
        type: Number,
        default: 0,
    },
});

const d = reactive({
    num: 0,
});

function AnimateToValue() {
    gsap.to(d, { duration: 0.5, num: props.value });
}

AnimateToValue()

// 避免已经执行了动画，才对props的值进行修改
watch(() => props.value, () => AnimateToValue())

</script>
