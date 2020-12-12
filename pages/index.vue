<template>
  <div class="container">

    <section id="header" class="mt-1">
      <div class="row">
        <div class="discripchion order-lg-1  order-2 col-12 col-lg-6 mb-4 mb-lg-0">
          <div class="about-h">

          <h1 class="text-left"><img class="img-fluid logo-head" src="/logo.png" alt=""> Запишись</h1>

          </div>
          <hr />
          <div></div>

          <p class="about text-left">
            Сервис
            <br />для записи-онлайн
            <br />в вашем городе
          </p>
        </div>

        <div class="img_header order-lg-2  order-1 col-12 col-lg-6 mb-4 mb-lg-0 ">
          <img class="img-fluid" src="/lg.png" />
        </div>
      </div>
    </section>
    <section id="filter-users">
      <div class="row justify-content-center">
        <div class="col-10 text-center search-form">
          <select id="cityUser" class="form-control" v-model="city">
            <option value selected>Выбрать город</option>
            <option value selected>Все города</option>
            <option v-for="user_city in sortedUsers" :key="user_city.id">{{ user_city}}</option>
          </select>
        </div>
        <div class="col-10 mt-5 text-center">
          <div class="search-form">
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-category form-control mr-sm-2"
                type="search"
                placeholder="Поиск категории"
                aria-label="Search"
                v-model="search"
              />
            </form>
          </div>
          <p class="mt-3" v-if="search">Результатов по запросу:{{ users.length }}</p>
        </div>
      </div>
    </section>
    <section id="section-users" class="mt-5">
      <CardUsers :openUser="openUser" :users="users"  :city="city" :search="search"/>

      <div v-if="load" class="text-center">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>
    </section>

  </div>
</template>

<script>
import CardUsers from "@/components/CardUsers";

import {mapState} from 'vuex'
export default {

  async fetch({ store}) {
    if (store.getters["users/users"].length === 0) {
      await store.dispatch("users/fetch");

    }
  },

  component: {
    CardUsers,

  },

  data(){
    return{
      city: "",
      search: "",
      all_city: this.$store.getters["users/users"].users,
      page:1,
      load:false,
      items:'this.users'
    }
  },
  computed: {
    users() {
      this.$store.getters["users/users"].users;
      if (this.city != "") {
        return this.$store.getters["users/users"].users.filter(elem => {
          if (this.search != "") {
            return (
              elem.city.includes(this.city) &&
              elem.name.toLowerCase().includes(this.search.toLowerCase())
            );
          } else {
            return elem.city.includes(this.city);
          }
        });
      }
      if (this.search != "") {

        return this.$store.getters["users/users"].users.filter(elem => {
          return elem.name.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.$store.getters["users/users"].users;
      }

    },
    sortedUsers() {
      let new_array = [];
      let items;
      for (items of this.all_city) {
        if(!new_array.includes(items.city)){
          new_array.push(items.city);
        }
      }
      return new_array.sort((a, b) => a.localeCompare(b));
    },

  },

  methods: {
    openUser(user) {
      this.$router.push(`/users/${user}`);
    },

  },



};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.discripchion {
  margin-top: 7rem;
  font-family: "Raleway", sans-serif;
}
.image-h1{
    width: 15%;
    margin: 1rem;
}
hr {
  background: #3cbfa6;
}
#cityUser {
  box-shadow: 4px 4px 4px #d2d5d7;
}
.about-h{
      display: flex;
    justify-content: space-around;
}
.logo-head{
    width: 5rem;
}
h1{
  text-shadow: 2px 2px 2px #7c869096;
}
#section-users{
  min-height: 100vh;
}
option {
  background-color: #3cbfa6;
}
@media (min-width: 390px) {
  h1 {
    font-size: 4.5rem;
  }
}
@media (max-width: 390px) {
  h1 {
    font-size: 1.5rem;
  }
}
@media (max-width: 390px) {
  .img_header {
    margin-top: 0;
  }
}
@media (max-width: 390px) {
  .discripchion {
    margin-top: 1rem;
  }
}
@media (max-width: 390px) {
.logo-head {
    width:1rem;
}
}



.form-control {
  width: 15rem;
}
.img_header {
  margin-top: 6rem;
}

.about {
  font-size: 3.5rem;
}


@media (max-width: 500px) {
  .about {
    font-size: 2rem;
  }
}
.search-form {
  display: flex;
  justify-content: center;
  width: 100%;
}
.form-category {
  background: #3cbfa6;
  width: 20rem;
  height: 4rem;
  box-shadow: 2px 2px 2px 4px #6c757d52;
}
.pointer {
  cursor: pointer;
}
svg {
  overflow: hidden;
  vertical-align: middle;
  font-size: 3rem;
  color: #3cbfa6;
}
</style>
