import axios from "axios";
import apiEnv from "../env/apiEnv.js"

const HOST = apiEnv.HOST


class UsersService {
    async getUser(id) {
        return await axios.get(`${HOST}/users/${id}`)
            .then(res => {
                let user = res.data
                return user
            });
    }
    async getUsers() {
        return await axios.get(`${HOST}/users/`)
            .then(res => {
                let users = res.data
                return users
            });
    }
    async signUpNewUser(payload) {
        return await fetch(`${HOST}/users`, {
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
    async saveNewUserData(payload, id) {
        return await fetch(`${HOST}/users/change/${id}`, {
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
    async followUser(id, userId) {
        return await fetch(`${HOST}/users/follow/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userId),
        })
            .then(res => {
                let data = res.data;
                return data;
            });
    }
    async isFollowedUser(id, userId) {
        return await axios.get(`${HOST}/users/followed/${id}/${userId}`)
            .then(res => {
                let users = res.data
                return users
            });
    }
    async unfollowUser(id, userId) {
        await fetch(`${HOST}/users/unfollow/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userId)
        })
    }
}

export default UsersService