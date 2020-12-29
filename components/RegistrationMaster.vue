<template>
  <div class="container reg-container fixed-top">

    <div class="row justify-content-center ">
      <div v-if="alert" class="alert alert-warning alert-dismissible fade show" role="alert">
        {{form_err}}
        <button
          type="button"
          @click="oncloseAlert"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="wrapper fadeInDown zero-raduis">
        <button class="btn-reg" @click="onCloseReg"><fa class="fa-times" icon="times"></fa></button>
        <div class="row justify-content-center">
          <div id="formContent">
            <div class="fadeIn first">
              <h2 class="my-5">Регистрация</h2>
            </div>
            <form class="form" v-on:submit="postRegistration($event)">
              <input
                required
                type="text"
                id="email"
                class="fadeIn second zero-raduis"
                v-model="name"
                placeholder="Имя"
              />
              <input
                required
                type="text"
                id="email"
                class="fadeIn second zero-raduis form-control"
                v-model="email"
                placeholder="email"
              />
              <input
                required
                type="text"
                id="password"
                class="fadeIn third zero-raduis"
                v-model="password"
                placeholder="Пароль"
              />
              <input
                required
                type="text"
                id="password"
                class="fadeIn third zero-raduis"
                v-model="city"
                placeholder="Город"
              />
              <div class="form-check">
                <input type="checkbox" id="checkbox" v-model="checked" />
                <label class="form-check-label" for="exampleCheck1">Нажмите если вы мастер</label>
              </div>

                {{Allcategories}}

                <div v-if="checked" class="newflex form-group mt-3 ">

                  <div class="d-flex justify-content-center">
                <select  id="inputState" class="form-control" v-model="category_id">
                  <option v-for="cat in categories" :key="cat.id" :value="(cat.id)">{{cat.title}}</option>
                </select>
                </div>
                <label for="inputState">Категория услуг</label>
              </div>
              <!-- <div id="formFooter" class="justify-content-center">
                <nuxt-link class="text-center" to="/login">Уже зарегестрированы?</nuxt-link>
              </div> -->
              <button type="submit" class="btn-form">Регистрация</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
flex-end
<script>
export default {
  props: ["onCloseReg","onLogin"],
    computed:{
      Allcategories(){
      const headers = {
        "Content-Type": "application/json"
      };
        this.$axios
        .$get(`https://glebhleb.herokuapp.com/categories/`, {
          headers: headers
        })
        .then(resp => {
          this.categories =  resp

        });

        }
    },
  data() {
    return {
      name: "",
      password: "",
      email: "",
      city: "",
      alert: false,
      checked: false,
      form_err: "",
      category_id: 0,
      categories:[]
    };
  },
  methods: {
    oncloseAlert() {
      this.alert = false;
    },
    postRegistration(event) {
      event.preventDefault();
      let data = {
        name: this.name,
        password: this.password,
        email: this.email,
        city: this.city,
        master: this.checked,
        category_id:Number(this.category_id)
      };
      console.log(this.checked);

      const headers = {
        "Content-Type": "application/json"
      };
      let response = this.$axios
        .$post("https://glebhleb.herokuapp.com/user", data, {
          headers: headers
        })
        .then(
          response => {
            this.onLogin()
          },
          error => {
            this.form_err = error.response.data.detail;
            this.alert = true;
            setTimeout(() => {
            this.alert = false;

            }, 2000);
          }
        );
    }
  }
};
</script>


<style >


.btn-form{
  width: 80%;
  border: none;
  background: #3dc0a7;
  height: 2.5rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.newflex{
  display: flex;
  /* justify-content: end; */
  flex-direction: column;
}

.login {
  margin-top: 20rem;
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
.btn-reg{
  background: none;
  border: none;
  margin-left: auto;
}
.fa-times{
  font-size: 2rem;
  color: #3dc0a7;
}
.reg-container{
  margin-top: 5rem;
}

</style>