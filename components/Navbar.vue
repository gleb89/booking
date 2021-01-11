<template>
  <div>
  <b-navbar  toggleable="sm" type="light" variant="light" class="nav fixed-top">
          <nuxt-link no-prefetch class="navbar-brand" to="/">
        <img src="/logo.png" class="logo-nav" height="auto" alt />
     </nuxt-link>
      <div class="dropdown-div d-block d-sm-none">

          <button  @click="onOpen" class="btn-drop">
            {{authName}}
            
            <fa  class="icon-user" icon="user"></fa>
            <fa v-if="new_time" class="icon-circle" icon="circle"></fa>
            
        </button>
            <div class=" row d-block d-sm-none justify-content-center">
          <div class="mobile-drop" v-if="onDropdown">
          <div >
            <button @click="lkOpen" class=" btn-kabinet m-2 text-center" ><fa icon="user-cog"></fa>Кабинет<span class="ml-1" v-if="new_time">(Новых{{new_time}})</span></button>
          <br>
          <button @click="logout" class=" btn-logout mt-1" ><fa icon="sign-out-alt"></fa>выйти</button>
          </div>
          <div >
          <button  class="btn-login" @click="onLogin"><fa icon="sign-in-alt"></fa>Вход</button>
          <br />
          <button class=" btn-reg mt-1" @click="onRegister"><fa icon="arrow-alt-circle-right"></fa>Регистрация</button>
          </div>
          </div>
          </div>
        </div>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <nuxt-link no-prefetch class="nav-link"  to="/">Главная<span class="sr-only">(current)</span></nuxt-link>
        <nuxt-link no-prefetch class="nav-link" to="/users">Мастера</nuxt-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
          <div class="dropdown-div d-none d-sm-block">
          <button  @click="onOpen" class="btn-drop">
            
            <div class="">
              {{authName}}
              
            <fa  class="icon-user ml-1" icon="user"></fa>
            <fa v-if="new_time" class="icon-circle" icon="circle"></fa>
            </div>
            
            <div>
            
            </div>
            
      
            
        </button>
          <div class=" row justify-content-center">
          <div class="drop-m drop-menu mr-5" v-if="onDropdown">
          <div v-if="authName != null">
            <button @click="lkOpen" class=" btn-kabinet m-2" ><fa icon="user-cog"></fa>Кабинет<span class="ml-1" v-if="new_time">(Новых{{new_time}})</span></button>
          <br>
          <button @click="logout" class=" btn-logout" ><fa icon="sign-out-alt"></fa>выйти</button>
          </div>
          <div v-if="authName === null">
          <button  class="btn-login" @click="onLogin"><fa icon="sign-in-alt"></fa>Вход</button>
          <br />
          <button class=" btn-reg" @click="onRegister"><fa icon="arrow-alt-circle-right"></fa>Регистрация</button>
          </div>
          </div>
    </div>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
import { mapState } from "vuex";
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  computed: {
    authName(){
      let name_user = this.$store.state.auth
      if(name_user  === null){
        return null
      }
      else{
        this.time_user(name_user.user.id)
        return name_user.user.name
      }
    },
  },
  props: ["onLogin", "onRegister", "onDropdown", "onOpen","onLogout"],

  methods: {
      logout () {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.new_time = 0
      this.token = false
      this.$router.push('/')
      this.onLogout()
    },
    lkOpen(){
      this.$router.push((`/profile`))
      this.onLogout()
    },
    time_user(user_id){
      const headers = {
            "Content-Type": "application/json"
          };
        this.$axios
        .$get(`https://glebhleb.herokuapp.com/booking-data/${user_id}`,{
          headers: headers
        })
        .then(time_user =>{
          console.log(time_user.status);
        let new_count = []
        let bbg = 0
        

        for(let i of time_user ){
            new_count.push(i.time)
        }

        for(let i of new_count){
          let co =  i.filter(elem =>{
                if(elem.phone_owner && !elem.master_confirm){
                  bbg += 1
                }
            })
        }
        this.new_time +=  bbg
        // this.$store.commit("setNew_time", this.new_time);
        
        this.$store.dispatch('new_time/login',bbg)
        // Cookie.set("time", time);
        })
        .catch(function (error) {
        console.log(JSON.stringify(error))
  });
    }

  },
  data() {
    return {
      token:false,
      new_time:0
    };
  }
};
</script>

<style scoped>
.drop-menu {
    position: absolute;
    margin: inherit;
    z-index: 0;
    margin-right: 2rem;
    box-shadow: 3px 3px 3px #dcdce0;
}

.dropdown-div {

  display: flex;
  justify-content: flex-end;
}
.mobile-drop{
    position: absolute;
    background: white;
    min-height: 5rem;
    padding: .5rem;
    margin-top: 1rem;
}
.logo-nav{
  width: 1.5rem;
}
@media(min-width:775px){
  .icon-circle{
    position: absolute;
    right: 9px;
    font-size: 9px;
    bottom: 30px;
}
}
@media(max-width:775px){
  .icon-circle{
    position: relative;
    left: -6px;
    bottom: 8px;
    font-size: 10px;
}
}

.btn-logout {
  background: none;
  border: none;
  width: 100%;
}
.btn-kabinet{
  background: none;
  border: none;
}
.btn-login {
  background: none;
  border: none;
}
.icon-user{
  color: black;
}
.drop-m{
    padding: 3.3rem;
    right: -20px;
    width: 7rem;
    min-width: max-content;
    height: 10rem;
    display: flex;
    display: grid;
    background: white;
}
.btn-reg {
  background: none;
  border: none;
}
.nav{
  box-shadow: 11px 6px 20px 5px #b9bfc5;
}
.btn-drop {
  background: none;
  border: none;
}

.icon-drop {
  font-size: 1.5rem;
  color: #3cbfa6;
}
</style>


