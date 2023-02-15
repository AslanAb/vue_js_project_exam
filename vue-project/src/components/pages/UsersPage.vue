<script>
import UsersService from "../services/usersService"
const usersService = new UsersService()

export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user')),
            otherUsers: []
        }
    },
    methods: {
        getOtherUsers() {
            usersService.getUsers().then(res => {
                res.forEach(el => {
                    if (el._id !== this.userId) {
                        this.otherUsers.push(el)
                    }
                })
            });
        },
        async followFn(id) {
            await usersService.followUser(id, this.userId).then(() => {
                alert("Вы подписаны на этого автора!")
            })
                .catch(() => alert("Ошибка при подпиисании к автору!"))
        },
        async ifFollowedFn(id, userId) {
            await usersService.isFollowedUser(id, userId).then(res => {
                console.log(res);
                let result = res
                return result
            })
        },
        unfollowFn(id) {
            usersService.unfollowUser(id, this.userId).then(() => {
                alert("Вы отписаны от этого автора!")
            })
                .catch(() => alert("Ошибка при отписании от автора!"))
        }
    },
    created() {
        this.getOtherUsers()
    }
}

</script>

<template>
    <main class="main flex">
        <div class="mainLeft flex column aiCenter"></div>
        <div class="mainMid flex column aiCenter">
            <div class="autorsDiv" v-for="(user, index) in otherUsers" :key="index">
                <div class="userDiv1 flex sb aiCenter">
                    <h1 class="autorName">{{user.name}} {{user.surname}}</h1>
                    <button class="buttonStyle" @click="unfollowFn(user._id)">Отписаться</button>
                    <button class="buttonStyle" @click="followFn(user._id)">Подписаться</button>
                </div>
            </div>
        </div>
        <div class="mainRight flex column"></div>
    </main>
</template>

<style>

</style>