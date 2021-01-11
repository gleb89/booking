<template>
  <div class="container login-container fixed-top">
    <div class="row justify-content-center">
      <div v-if="log_ok" class="alert alert-info" role="alert">Привет {{ user_login.name }}!</div>
      <!-- <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="false"> -->
      <div v-if="!log_ok" class="wrapper fadeInDown  fade zero-raduis">
        <button class="btn-login" @click="onClose">
          <fa class="fa-times" icon="times"></fa>
        </button>
        <div id="formContent"  aria-hidden="true">
          <div class="fadeIn first row justify-content-center">
            <h2 class="my-5 col-12">Вход</h2>
            <div v-if="error_mess" class="col-10 alert alert-danger" role="alert">
              <p>{{error}}</p>
            </div>
          </div>

          <form class="form justify-content-center" v-on:submit="postLogin($event)">
            <input
              type="text"
              id="email"
              class="fadeIn second zero-raduis form-control"
              v-model="email"
              placeholder="email"
            />
            <input
              type="text"
              id="password"
              class="fadeIn third zero-raduis form-control"
              v-model="password"
              placeholder="Пароль"
            />
            <div id="formFooter justify-content-center">
              <button type="submit" class="btn-form">войти</button>
              <nuxt-link class="underlineHover text-center" to="/sendemail">Забыли пароль?</nuxt-link>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  middleware: "notAuthenticated",
  props: ["onClose"],
  data() {
    return {
      email: "",
      password: "",
      log_ok: false,
      error: "",
      error_mess: false,
      user_login: ""
    };
  },
  methods: {
    postLogin(event) {
      event.preventDefault();
      let data = {
        email: this.email,
        password: this.password
      };
      const headers = {
        "Content-Type": "application/json"
      };
      let response = this.$axios
        .$post("https://glebhleb.herokuapp.com/login", data, {
          headers: headers
        })
        .then(
          token => {
            const auth = {
              access_token: `Bearer ${token.access_token}`,
              user: token.user
            };
            this.$store.commit("setAuth", auth);
            Cookie.set("auth", auth);
            this.user_login = this.$store.state.auth.user;
            this.log_ok = true;

            setTimeout(() => {
              this.onClose();
            }, 2000);
          },
          error => {
            this.error_mess = true;
            this.error = 'Неверные данные';
            setTimeout(() => {
              this.error_mess = false;
            }, 2000);
          }
        );
    }
  }
};
</script>


<style >
.btn-form {
  width: 80%;
  border: none;
  background: #3dc0a7;
  height: 2.5rem;
}
.zero-raduis {
  border-radius: 0px !important;
}

a {
  color: #92badd;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  display: inline-block;
  color: #56baed;
}

/* STRUCTURE */

.wrapper {
  position: absolute;
  /* width: max-content; */
  max-width: fit-content;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  opacity: 0.99;
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
}

#formFooter {
  padding: 2px;
  text-align: right;
  width: 90%;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
  background-color: #3cbfa6;
  border: none;
  color: white;
  width: 85%;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 16px;
  cursor: pointer;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
  background-color: #56baed;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type="text"],
input[type="email"] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus,
input[type="email"]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder,
input[type="email"]:placeholder {
  color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  opacity: 0.7;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
  animation-duration: 1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  width: 0;
  height: 2px;
  background-color: #3cbfa6;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after {
  width: 100%;
}

/* OTHERS */

*:focus {
  outline: none;
}

#icon {
  width: 30%;
}
.btn-login {
  background: none;
  border: none;
  margin-left: auto;
}
.fa-times {
  font-size: 2rem;
  color: #3dc0a7;
}

.login-container {
  margin-top: 5rem;
}
.span {
  font-size: 1rem;
  max-width: 1rem;
}
.alert-danger {
  width: max-content;
  position: absolute;
}
.alert{
  width: 100%;
  text-align: center;
  margin: 1rem;
}
</style>