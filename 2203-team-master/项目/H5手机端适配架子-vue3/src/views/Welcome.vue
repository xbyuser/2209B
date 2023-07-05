<template>
    <div class='app'>
        <h3>欢迎你</h3>
    </div>
</template>

<script>
    import {
        reactive,
        toRefs,
        computed,
        watch,
        onMounted
    } from 'vue';
    import {
        useRoute,
        useRouter
    } from 'vue-router';
    export default {
      // components:{},
        setup() {

            let router = useRouter()
            let route = useRoute()

            const state = reactive({

            })

            onMounted(() => {

            })

            return {
                ...toRefs(state),
            }
        }

    }
</script>

<style scoped lang='scss'>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
