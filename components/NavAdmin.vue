<template>
  <div>
    <nav class="navbar fixed-top">
      <nuxt-link to="/">
      </nuxt-link>
      <div class="menu-login">
        <i class="fas fa-users"></i>
        <input type="checkbox" id="check" class="fixed" @click="menuClick" />
        <label for="check">
          <div class="btn1" id="btn1">
            <span class="span_one"></span>
            <span></span>
            <span></span>
          </div>
        </label>
      </div>
    </nav>
    <nav class="nav fixed-top" v-bind:class="{ menu_active: showMobileMenu }">
      <ul class="navbar-nav">
          <li class="nav-item" @click="closeMenu">
            <nuxt-link  to="/">Главная</nuxt-link>
        </li>
        <hr />
            <li class="nav-item" @click="closeMenu">
          <nuxt-link no-prefetch to="/profile">Профиль</nuxt-link>
        </li>
        <hr />
        <li class="nav-item" @click="closeMenu">
          <nuxt-link no-prefetch to="/profile/zapic">Мои записи</nuxt-link>
        </li>
        <hr />
          <li class="nav-item" @click="closeMenu">
          <nuxt-link no-prefetch to="/profile/datetime">Добавить <br>время</nuxt-link>
        </li>
        <hr />
        <div  class="cabinet">
          <p @click="logout" class="ic-exit">выход <fa  icon="sign-out-alt"></fa></p>

        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      showMobileMenu: false
    };
  },
  methods: {
      logout() {
      Cookie.remove('auth')
      this.$store.commit('setAuth', null)
      this.token = false
      this.$router.push('/')
    },
    menuClick() {
        this.showMobileMenu = !this.showMobileMenu
    },
    home() {
      console.log("i home");
    },
    closeMenu() {
      let uu = document.getElementById("check");
      uu.checked = false;
      this.menuClick();
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-item {
  font-size: 1.5rem;

}
@media (max-width: 500px) {
  .nuxt-link {
    font-size: 1.5rem;
}
}
.my_nav {
  display: flex;
  justify-content: flex-end;
}
.nav {
  position: fixed;
  left: -50px;
  top: 0;
  z-index: 99;
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  transition: 1.2s;
  transform: translateX(-100%);
}

.menu_active {
  transform: translateX(0%);
  left: 0;
  width: 20%;
  opacity: 0.99;
  box-shadow: 10px -2px 13px 6px #0000004f;
}


@media (max-width: 500px) {
  .menu_active {
    width: 80%;
}
}
.ic-exit{
  font-size: 1.5rem;
}
#check {
  position: absolute;
  z-index: -9999;
  top: -999px;
  cursor: pointer;
}
.btn1 {
  width: 3rem;
  height: 2rem;
  display: block;
  margin: auto;
  position: relative;
  margin-left: 60px;
  transform: translateX(-70%);
  margin-top: 1rem;
  & > span {
    width: 100%;
    height: 20%;
    background-color: #4d4d4d;
    display: block;
    position: absolute;
    border-radius: 15%;
    cursor: pointer;
    &:nth-of-type(1) {
      top: 0%;
      transition: top 120ms linear 140ms, transform 120ms ease;
    }
    &:nth-of-type(2) {
      top: 40%;
      width: 70%;
      transition: width 1ms linear 60ms;
    }
    &:nth-of-type(3) {
      top: 80%;
      width: 30%;
      transition: top 120ms linear 140ms, transform 120ms ease;
    }
  }
}
#check:checked ~ label > .btn1 > span {
  &:nth-of-type(1) {
    top: 40%;
    transform: rotate(45deg);
    transition: top linear 120ms, transform 110ms ease 140ms;
  }
  &:nth-of-type(2) {
    width: 0;
  }
  &:nth-of-type(3) {
    top: 40%;
    transform: rotate(-45deg);
    width: 100%;
    transition: top linear 100ms, transform 100ms ease 140ms;
  }
}
.my_linc {
  color: #5d8abb;
}
hr {
  background: cadetblue;
  width: 70%;
}
.pointer {
  cursor: pointer;
}
@media (max-width: 500px) {
  .image_logo {
    width: 10rem;
  }
}
@media (max-width: 500px) {
  .person-img {
    width: 3rem;
  }
}
.cabinet :hover {
  color: #3cbfa6;
  width: 4.5rem;
}
.cabinet {
  cursor: pointer;
}
</style>