<script>
import UsersService from "../services/usersService"
const usersService = new UsersService()

export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        async loginFn() {
            if (this.email.length < 1 || this.password.length < 1) {
                return alert("Введите значения!")
            }
            let users = await usersService.getUsers()
            for (const user of users) {
                if (user.email == this.email && user.password == this.password) {
                    localStorage.setItem("user", JSON.stringify(user._id))
                    alert("Ура!")
                    return
                } else if (user.email == this.email && user.password != this.password) {
                    return alert("Неверный пароль!")
                }
            }
            return alert("Пользователь с таким email незарегистрирован!")
        }
    }
}
</script>

<template>
    <main class="main flex aiCenter sa">
        <div class="flex sb loginPageMain">
            <div class="loginPageMainDiv loginPageMainDivLeft">
                <div class="flex center">
                    <p class="p2">Войти в аккаунт</p>
                </div>
                <form action="" class="flex column m20">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" class="m20" v-model="email">
                    <label for="password">Пароль</label>
                    <input type="password" name="password" id="password" class="m20" v-model="password">
                    <button type="button" class="loginButton buttonStyle" @click="loginFn">Войти</button>
                </form>
                <button type="button" class="registrationButton buttonStyle"
                    @click="$router.push('/signup')">Зарегистрироваться</button>
            </div>
            <div class="loginPageMainDiv loginPageMainDivRight"></div>
        </div>
    </main>
</template>

<style>

</style>