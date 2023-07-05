<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
/* 注意这里是全局样式，不用scoped */
// @import  '@/assets/style/reset.scss'; //引入全局样式重置库
 
</style>
