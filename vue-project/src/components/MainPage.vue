<script>
import MainHeader from "./pages/MainHeader.vue"
import MainFooter from "./pages/MainFooter.vue"

export default {
    components: { MainHeader, MainFooter }
}
</script>

<template>
    <div>
        <main-header></main-header>
        <router-view></router-view>
        <main-footer></main-footer>
    </div>
</template>

<style>

</style>