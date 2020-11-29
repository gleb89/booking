<template>
    <div class="container">
        <h2>all users</h2>
        <CardUsers :openUser="openUser" :users="users"/>

        <!-- <div class="card" v-for="user of users" :key="user.id" >
            <p >{{ user.name }}</p>
            <button class="btn rounded-pill" @click="openUser(user.id)">перейти</button>

        </div> -->
    </div>
</template>


<script>
import CardUsers from "@/components/CardUsers";
export default {
    async fetch({store}){
        if (store.getters['users/users'].length === 0){
            await store.dispatch('users/fetch')
        }
    },
    component:{
        CardUsers
    },
    computed: {
        users(){
            return this.$store.getters['users/users'].users
        }
    },
    methods: {
        openUser(user) {
            this.$router.push((`/users/${user}`))
        }
    },
}
</script>