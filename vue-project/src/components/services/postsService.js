import axios from "axios";
import apiEnv from "../env/apiEnv.js"

const HOST = apiEnv.HOST


class PostsService {
    async getPosts() {
        return await axios.get(`${HOST}/posts/`)
            .then(res => {
                let posts = res.data
                return posts
            });
    }
    async saveNewPostData(payload, id) {
        return await fetch(`${HOST}/posts/change/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                let data = res.data;
                return data;
            });
    }
    async publicNewPost(payload) {
        return await fetch(`${HOST}/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                let data = res.data;
                return data;
            });
    }
    async deletePostbyId(id) {
        return await fetch(`${HOST}/posts/${id}` ,
            { method: "DELETE" })
            .then(res => {
                let data = res.data;
                return data;
            });
    }
    async likePostFn(postId, userId) {
        const payload = {
            postId: postId,
            userId: userId
        }
        return await fetch(`${HOST}/posts/like/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        })
            .then(res => {
                let data = res.data;
                return data;
            });
    }
}

export default PostsService