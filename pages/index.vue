<template>
  <div class="container">
    <section id="header" class="mt-1">
      <div class="row">
        <div class="discripchion col-12 col-lg-6 mb-4 mb-lg-0">
          <h1 class="text-left">Запишись</h1>
          <hr />
          <p class="about text-left">
            Сервис
            <br />для записи-онлайн
            <br />в вашем городе
          </p>
        </div>
        <div class="img_header col-12 col-lg-6 mb-4 mb-lg-0">
          <img class="img-fluid" src="/header.png" />
        </div>
      </div>
    </section>
    <section id="section-users">
        <CardUsers :openUser="openUser" :users="users"/>
    </section>
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

<style >
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.discripchion {
  margin-top: 7rem;
  font-family: "Raleway", sans-serif;
}
hr{
  background: #3cbfa6;
}
h1 {
  font-size: 2rem;
}
@media (min-width: 390px) {
  h1{
    font-size: 4.5rem;
  }
}
.img_header {
  margin-top: 6rem;
}

.about {
  font-size: 3.5rem;
}


@media (max-width: 500px) {
  .discripchion {
    order: 2;
  }
}
@media (max-width: 500px) {
  .about {
    font-size: 2rem;
  }
}

</style>
