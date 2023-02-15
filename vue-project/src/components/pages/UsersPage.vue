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
        followFn(id) {
            usersService.followUser(id, this.userId).then(() => {
                alert("Вы подписаны на этого автора!")
            })
                .catch(() => alert("Ошибка при подпиисании к автору!"))
        },
        async ifFollowedFn(id, userId) {
            await usersService.isFollowedUser(id, userId).then(res => {
                return res
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
            <div class="autorsDiv" v-for="user, index in otherUsers" :key="index">
                <div class="userDiv1 flex sb aiCenter">
                    <h1 class="autorName">{{user.name}} {{user.surname}}</h1>
                    <button class="followAuthor buttonStyle" @click="followFn(user._id)" v-if="ifFollowedFn(user._id, userId)">Подписаться</button>
                    <button class="unfollowAuthor buttonStyle" @click="unfollowFn(user._id)" v-if="ifFollowedFn(user._id, userId) == true" >Отписаться</button>
                </div>
            </div>
        </div>
        <div class="mainRight flex column"></div>
    </main>
</template>

<style>

</style>