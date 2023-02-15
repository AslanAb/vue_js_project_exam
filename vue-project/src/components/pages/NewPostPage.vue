<script>
import PostsService from "../services/postsService"
const postsService = new PostsService()

export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('user')),
            title: "",
            text: ""
        }
    },
    methods: {
        async publickPost() {
            if (this.title.length < 1 || this.text.length < 1) {
                alert('Заполните все поля!')
                return false;
            }
            const payload = {
                title: this.title,
                text: this.text,
                authorId: this.userId
            }
            await postsService.publicNewPost(payload).then(() => {
                alert("Ваш пост успешно опубликован!")
            })
                .catch(() => alert("Ошибка публикации поста!"))
        }
    }
}
</script>

<template>
    <main class="main flex aiCenter sa">
        <div class="flex sa loginPageMain">
            <div class="loginPageMainDiv loginPageMainDivLeft">
                <div class="flex center">
                    <p class="p2">Публикация поста</p>
                </div>
                <form action="" class="flex column m20">
                    <label for="titleR">Название публикации</label>
                    <input type="text" id="titleR" name="titleR" class="m20" v-model="title">
                    <label for="textR">Текст публикации</label>
                    <textarea type="text" id="textR" name="textR" class="m20 textInput" v-model="text"></textarea>
                    <button type="button" class="buttonPublic buttonStyle" @click="publickPost">Опубликовать</button>
                </form>
            </div>
            <div class="loginPageMainDivRight loginPageMainDiv"></div>
        </div>
    </main>
</template>

<style>

</style>