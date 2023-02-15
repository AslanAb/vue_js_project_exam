<script>
export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user'))
        }
    }
}
</script>

<template>
    <header class="header flex sb aiCenter">
        <div class="logoImg">
            <img src="../../assets/images/logo.jpg" alt="" class="logoImg">
        </div>
        <div class="menu flex sb aiCenter">
            <button class="buttonMenu buttonStyle" @click="$router.push('/home')">Лента новостей</button>
            <button class="buttonMenu buttonStyle" @click="$router.push('/users')">Список пользователей</button>
            <button class="buttonMenu buttonStyle" @click="$router.push('/account')">Личный кабинет</button>
        </div>
        <div class="login">
            <button class="buttonStyle buttonLogin" @click="$router.push('/login')" >Войти</button>
            <button class="buttonStyle buttonLogout hide" data-path="login">Выйти</button>
        </div>
    </header>
</template>

<style>

</style>