<template>
  <section id="body">
    <header>
      <Navbar
        :onLogin="onLogin"
        :onRegister="onRegister"
        :onDropdown="onDropdown"
        :onOpen="onOpen"
        :onLogout="onLogout"
      />

    </header>

    <main class="mt-3 pt-3">
      <Login v-if="menu" :onClose="onClose" />
      <RegistrationMaster v-if="register" :onCloseReg="onCloseReg" :onLogin="onLogin" />
      <Nuxt />
    </main>
    <footer class="navbar-fixed-bottom">
      <p class="text-center">footer</p>
    </footer>
  </section>
</template>

<script>
import Navbar from "@/components/Navbar";
import Login from "@/components/Login";
import RegistrationMaster from "@/components/RegistrationMaster";
export default {


  data() {
    return {
      menu: false,
      register: false,
      onDropdown: false,


    };
  },
  methods: {
    onLogout() {
      this.onDropdown = false;
    },
    onLogin() {
      this.register = false;
      this.menu = !this.menu;
      this.onDropdown = false;
    },
    onOpen() {
      this.onDropdown = !this.onDropdown;

    },
    onRegister() {
      this.menu = false;
      this.register = !this.register;
      this.onDropdown = false;
    },
    onClose() {
      this.onDropdown = false;
      this.menu = false;
    },
    onCloseReg() {
      this.onDropdown = false;
      this.register = false;
    }
  },
  component: {
    Navbar,
    Login
  }
};
</script>

<style  >
html{
  margin: 0;
  padding: 0;
}
#body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  position: relative;
}
</style>
