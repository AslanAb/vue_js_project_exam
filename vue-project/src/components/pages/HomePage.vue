<script>
import PostsService from "../services/postsService"
import UsersService from "../services/usersService"
const postsService = new PostsService()
const usersService = new UsersService()

export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user')),
            followedPosts: [],
            followedUsersId: [],
            followedUsersNamesAndSurnames: []
        }
    },
    methods: {
        async getFollowedUsers() {
            await usersService.getUsers().then(res => {
                res.forEach(el => {
                    if (el.followers.includes(this.userId)) {
                        this.followedUsersId.push(el._id)
                        this.followedUsersNamesAndSurnames.push({
                            "id": el._id,
                            "name": el.name,
                            "surname": el.surname
                        })
                    }
                })
            })
        },
        async getFollowedPosts() {
            await postsService.getPosts().then(res => {
                res.forEach(el => {
                    if (this.followedUsersId.includes(el.author)) {
                        this.followedPosts.push(el)
                    }
                })
            })
        },
        getUserNameAndSurname(id) {
            let name = usersService.getUser(id).then(res => {
                return res.name
            })
            return name
        }
    },
    created() {
        this.getFollowedUsers();
        this.getFollowedPosts();
    }
}
</script>

<template>
    <main class="main flex">
        <div class="mainLeft flex column aiCenter"></div>
        <div class="mainMid flex column aiCenter">
            <div class="post" v-for="post, index in followedPosts" :key="index">
                <div>
                    <input type="checkbox" class="checker" id="${post._id}">
                    <div class="postTop">
                        <div class="flex sb aiCenter">
                            <h1 class="titleSearch">{{post.title}}</h1>
                            <h2 class="autorSpan">
                                {{ followedUsersNamesAndSurnames.find(el => el.id == post.author).name }}
                                {{ followedUsersNamesAndSurnames.find(el => el.id == post.author).surname }}
                            </h2>
                        </div>
                        <p class="p2 items-text textSearch">{{post.text}}</p>
                        <div class="bottom"></div>
                    </div>
                    <label class="label" for="${post._id}"></label>
                </div>
                <div class="flex sb aiCenter">
                    <button class="buttonLikePost flex aiCenter sa" onclick="buttonLikePost('${post._id}')">
                        <img src="http://localhost:8080/static/images/like.png" alt="">
                        Нравится
                        <span class="countOfLikes">{{post.likes.length}}</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="mainRight flex column"></div>
    </main>
</template>

<style>

</style>