<template>
  <div>
  <b-navbar toggleable="sm" type="light" variant="light" class="fixed-top">
          <nuxt-link no-prefetch class="navbar-brand" to="/">
        <img src="/logotip.png" width="100" height="auto" alt />
     </nuxt-link>
      <div class="dropdown-div d-block d-sm-none">

          <button  @click="onOpen" class="btn-drop">
            <fa  class="icon-user" icon="user"></fa>
            {{authName}}
        </button>
            <div class=" row d-block d-sm-none justify-content-center">
          <div class="drop-menu mr-5" v-if="onDropdown">
          <div v-if="authName != null">
            <button @click="lkOpen" class=" btn-kabinet m-2 text-center" >Личный кабинет</button>
          <br>
          <button @click="logout" class=" btn-logout" >выйти</button>
          </div>
          <div v-if="authName === null">
          <button  class="btn-login" @click="onLogin">Вход</button>
          <br />
          <button class=" btn-reg" @click="onRegister">Регистрация</button>
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
            <fa  class="icon-user" icon="user"></fa>
            {{authName}}
        </button>
          <div class=" row justify-content-center">
          <div class="drop-menu mr-5" v-if="onDropdown">
          <div v-if="authName != null">
            <button @click="lkOpen" class=" btn-kabinet m-2" >Личный кабинет</button>
          <br>
          <button @click="logout" class=" btn-logout" >выйти</button>
          </div>
          <div v-if="authName === null">
          <button  class="btn-login" @click="onLogin">Вход</button>
          <br />
          <button class=" btn-reg" @click="onRegister">Регистрация</button>
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
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  computed: {
    authName(){
      let name_user = this.$store.state.auth
      if(name_user  === null){
        console.log('none');

        return null
      }
      else{
        console.log('yes');

        return name_user.user.name
      }
    }
  },
  props: ["onLogin", "onRegister", "onDropdown", "onOpen","onLogout"],

  methods: {
      logout () {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.token = false
      this.$router.push('/')
      this.onLogout()
    },
    lkOpen(){
      this.$router.push((`/kabinet`))
      this.onLogout()
    }

  },
  data() {
    return {
      token:false,


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
.btn-logout {
  background: none;
  border: none;
}
.btn-kabinet{
  background: none;
  border: none;
}
.btn-login {
  background: none;
  border: none;
}
.btn-reg {
  background: none;
  border: none;
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