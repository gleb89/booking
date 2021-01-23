<template>
    <div class="container mt-4">
        <fa @click="onPage" class="mt-4 icon-nazad" icon="angle-left"></fa>
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
        head:{
    title:'Список мастеров'
  },
  meta:[
    { hid: 'homepage', name: 'description', content:'Каталог мастеров для записи-онлайн' },
    { hid: 'homepage', name: 'keywords', content:'стоматолог,парикмахер,маникюр,педикюр,врач' }
  ],
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
    onPage(){
        this.$router.go(-1);
      },
        openUser(user) {
            this.$router.push((`/users/${user}`))
        }
    },
}
</script>
<style >
.icon-nazad{
  font-size: 3rem;
  color: cornflowerblue;
  cursor: pointer;
}
</style>