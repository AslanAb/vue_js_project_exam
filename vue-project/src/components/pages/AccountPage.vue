<script>
import UsersService from "../services/usersService"
import PostsService from "../services/postsService"

const usersService = new UsersService()
const postsService = new PostsService()

export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user')),
            user: {},
            userPosts: [],
            isUserEditing: false,
            userNewData: {
                name: "",
                surname: "",
                email: ""
            },
            isPostEditing: false,
            editingPostId: "",
            postNewData: {
                title: "",
                text: ""
            },
            isUserEdited: 0,
            isPostEdited: 0
        }
    },
    methods: {
        getCurrentUser() {
            usersService.getUser(this.userId).then(res => {
                this.user = res
            });
        },
        getUserPosts() {
            postsService.getPosts().then(res => {
                res.forEach(el => {
                    if (el.author == this.userId) {
                        this.userPosts.push(el)
                    }
                })
            })
        },
        editUser() {
            this.isUserEditing = !this.isUserEditing
        },
        async saveNewUserData() {
            if (this.userNewData.name.length < 1 || this.userNewData.surname.length < 1) {
                alert('Заполните все поля!')
                return false;
            } else if (!this.validateEmail()) {
                alert('Некорректный email!')
                return false;
            }
            const newUserData = {
                "name": this.userNewData.name,
                "surname": this.userNewData.surname,
                "email": this.userNewData.email,
            }
            await usersService.saveNewUserData(newUserData, this.userId).then(() => {
                this.isUserEdited++
                alert("Изменения внесены!")
            })
                .catch(() => alert("Ошибка отправки запроса на изменение данных!"))
        },
        validateEmail() {
            return String(this.userNewData.email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        editPost() {
            this.isPostEditing = !this.isPostEditing
        },
        async saveNewPostData(id) {
            if (this.postNewData.title.length < 1 || this.postNewData.text.length < 1) {
                alert('Поля не могут быть пустыми!')
                return false;
            }
            const newPostData = {
                "title": this.postNewData.title,
                "text": this.postNewData.text
            }
            await postsService.saveNewPostData(newPostData, id).then(() => {
                this.isPostEdited++
                alert("Изменения внесены!")
            })
                .catch(() => alert("Ошибка отправки запроса на изменение данных!"))
        },
        deletePost(id) {
            postsService.deletePostbyId(id).then(() => {
                this.isPostEdited++
                alert("Пост удален!")
            })
                .catch(() => alert("Ошибка при удалении поста!"))
        }
    },
    mounted() {        
        this.getUserPosts()
        this.getCurrentUser()
    },
    watch: {
        isUserEdited() {
            this.getCurrentUser()
        },
        isPostEdited() {
            this.getUserPosts()
        }
    }
}

</script>

<template>
    <main class="main flex">
        <div class="mainLeft flex column aiCenter">
            <div class="portfileCard flex column aiCenter">
                <img src="../../assets/images/santa.png" alt="" class="santaImg">
                <p class="p1 idP uses_name">{{ user.name }}</p>
                <span class="p1 nameSurnameP uses_surname">{{ user.surname }}</span>
                <span class="p1 nameSurnameP uses_email">{{ user.email }}</span>
                <button class="buttonLikePost flex aiCenter sb" @click="editUser">Редактировать профиль</button>
                <button class="buttonNewPost buttonStyle flex sa aiCenter" @click="$router.push('./newpost')">Новая публикация</button>
                <div class="flex aiCenter column" v-if="isUserEditing">
                    <span>Имя</span>
                    <textarea class="new_name" type="text" cols="20" rows="5" v-model="userNewData.name"></textarea>
                    <span>Фамилие</span>
                    <textarea name="" class="new_surname" cols="30" rows="10" v-model="userNewData.surname"></textarea>
                    <span>Email</span>
                    <textarea name="" class="email" cols="30" rows="10" v-model="userNewData.email"></textarea>
                    <button class="newPostData" @click="saveNewUserData">Сохранить</button>
                </div>
            </div>
        </div>
        <div class="mainMid flex column aiCenter">
            <div class="post" v-for="post, index in userPosts" :key="index">
                <div>
                    <input type="checkbox" class="checker" id="${post._id}">
                    <div class="postTop">
                        <div class="flex sb aiCenter">
                            <h1 class="titleSearch">{{ post.title }}</h1>
                            <h2 class="autorSpan">{{ user.name }} {{ user.surname }}</h2>
                        </div>
                        <p class="p2 items-text textSearch">{{ post.text }}</p>
                        <div class="bottom"></div>
                    </div>
                    <label class="label" for="${post._id}"></label>
                </div>
                <div class="flex sb aiCenter">
                    <div class="flex aiCenter sb">
                        Количество лайков
                        <span class="countOfLikes">{{ post.likes.length }}</span>
                    </div>
                    <div class="flex aiCenter sb">
                        <!-- <textarea class="hide" v-model="editingPostId">{{ post._id }}</textarea> -->
                        <button class="buttonLikePost flex aiCenter sb" @click="editPost">Редактировать пост</button>
                        <button class="buttonLikePost flex aiCenter sb" @click="deletePost(post._id)">Удалить
                            пост</button>
                    </div>
                </div>
                <div class="flex aiCenter column" v-if="isPostEditing">
                    <span>Название поста</span>
                    <textarea class="new_title" type="text" cols="15" rows="5" v-model="postNewData.title"></textarea>
                    <span>Текст поста</span>
                    <textarea name="" class="newTextArea" cols="30" rows="10" v-model="postNewData.text"></textarea>
                    <button class="newPostData" @click="saveNewPostData(post._id)">Сохранить</button>
                </div>
            </div>
        </div>
        <div class="mainRight flex column"></div>
        <div class="hidden_div"></div>
        <div class="hidden_div_user"></div>
    </main>
</template>

<style>

</style>