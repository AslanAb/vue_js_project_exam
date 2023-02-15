<script>
import UsersService from "../services/usersService"
const usersService = new UsersService()

export default {
    data() {
        return {
            name: "",
            surname: "",
            email: "",
            password: null
        }
    },
    methods: {
        async regitstrationFn() {
            let users = await usersService.getUsers().then(res => {
                return res
            })
            for (const user of users) {
                if (user.email == this.email) {
                    return alert("Ошибка! Вы уже были зарегистрированы!")
                }
            }
            if (this.checkData()) {
                const newUser = {
                    "name": this.name,
                    "surname": this.surname,
                    "email": this.email,
                    "password": this.password
                }
                await usersService.signUpNewUser(newUser).then(() => {
                    alert("Вы успешно зарегистрированы!")
                })
                    .catch(() => alert("Ошибка отправки запроса на регистрацию!"))
            }
        },
        validatePassword() {
            return String(this.password)
                .match(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g
                );
        },
        validateEmail() {
            return String(this.email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        checkData() {
            if (this.name.length < 1 || this.surname.length < 1) {
                alert('Заполните все поля!')
                return false;
            } else if (!this.validateEmail()) {
                alert('Некорректный email!')
                return false;
            } else if (!this.validatePassword()) {
                alert('Ошибка! Пароль должен быть не менее 8 символов, содержать не менее 1 заглавной, не менее 1 прописной буквы и не менее 1 цифры!')
                return false;
            } else {
                return true
            }
        }
    }
}


</script>

<template>
    <main class="main flex aiCenter sa">
        <div class="flex sb loginPageMain">
            <div class="loginPageMainDiv loginPageMainDivLeft">
                <div class="flex center">
                    <p class="p2">Регистрация</p>
                </div>
                <form action="" class="flex column ">
                    <label for="nameR">Ваше имя</label>
                    <input type="text" id="nameR" name="nameR" class="m20" v-model="name">
                    <label for="surnameR">Ваша фамилия</label>
                    <input type="text" id="surnameR" name="surnameR" class="m20" v-model="surname">
                    <label for="emailR">Почтовый адрес</label>
                    <input type="email" name="emailR" id="emailR" class="m20" v-model="email">
                    <label for="passwordR">Пароль</label>
                    <input type="password" name="password" id="passwordR" class="m20" v-model="password">
                    <button type="button" class="submitRegistration buttonStyle"
                        @click="regitstrationFn">Зарегистрироваться</button>
                </form>
            </div>
            <div class="loginPageMainDiv loginPageMainDivRight"></div>
        </div>
    </main>
</template>

<style>

</style>