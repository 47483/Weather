<script setup>
    //Defining a prop to get a quote from
    const props = defineProps(['quote']);
</script>

<template>
    <p class="center">{{ props.quote }}</p>
</template>

<style scoped>

</style>