<template>
  <div class="container ">
   <div class="profile">
      <Gallery
        v-if="image"
        :closeGall="closeGall"
        :openImageUp="openImageUp"
        :bigimage="bigimage"
        :openImageIn="openImageIn"
        :gallery_image="gallery_image"
        :onCloseTar="onCloseTar"
      />
      <nav class="navbar navbar-light navbar-user">
        <ul class="navbar-nav mr-auto d-flex flex-row">
          <li class="nav-item m-2">
            <a @click.prevent="openHome" class="nav-link" href="#">
              Профиль
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item m-2">
            <a @click.prevent="openZapis" class="nav-link" href="#">Запись</a>
          </li>
        </ul>
      </nav>
      <div v-if="home" class="row justify-content-center">
        <div  id="home" class="col-12 mt-3">
          <div class="row">
            <div class="col-12 col-lg-4">
              <div class="p-1">
              <img class="im-avatar img img-fluid " :src="user.avatar" alt />
              </div>
              <!-- <Rating class="mb-2" /> -->
              <p v-if="!ratingChange">Рейтинг:{{user.rating}}</p>
              <p v-if="ratingChange">Рейтинг:{{ authrating}}</p>
              <div
                v-if="rating_click"
                class="alert-rating alert alert-warning"
                role="alert"
              >Спасибо за оценку!</div>
              <div
                v-if="nonrating"
                class="alert-rating alert alert-danger"
                role="alert"
              >Нужна регистрация!</div>
              <p v-if="!ratingChange">
                <fa
                  v-for="(star,index) of usRating(user.rating)"
                  :key="
          star.id"
                  @click="clickRating(index+1,user.id)"
                  :class="{active : active_el == star }"
                  class="icons_rating"
                  icon="star"
                ></fa>
              </p>
              <p v-if="ratingChange">
                <fa
                  v-for="(star,index) of usRating(authrating)"
                  :key="
          star.id"
                  @click="clickRating(index+1,user.id)"
                  :class="{active : active_el == star }"
                  class="icons_rating"
                  icon="star"
                ></fa>
              </p>
              <p>Специалист:{{user.name}}</p>
              <p v-if="user.category">Услуги:{{user.category.title}}</p>
              <p>Город:{{user.city}}</p>
              <p v-if="user.phone">Телефон: {{user.phone}}</p>
            </div>
            <div class="col-12 col-lg-8 img-block">
              <h2>Фото работ</h2>
              <div class="container">
              <div class="row gallery5 ">
                 <div v-if="user.images.length > 0" id="photo" class="row justify-content-center p-1">
                <div  v-for="(photo,projectIndex) in imagesList" :key="photo.id" class="ramka text-center col-12 col-lg-4 ">
                <img
                  @click.prevent="openImg(projectIndex)"
                  class="gallery-img img-fluid "
                  :src="photo"
                  alt
                />
                </div>
              </div>
              </div>
              </div>
              <div v-if="user.images.length === 0"  id="photo" class="row justify-content-center">
                <h4>Мастер еще не загрузил фото</h4>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div id="zapis" v-if="zapis" class="row justify-content-center">

          <div id="calendar-data" class="col-12 mt-3">
            <div class="container">
            <div class="row">
            <div v-if="succes" class=" col-12 col-lg-6 text-left justify-content-center p-2 ">
              <p>Выберите дату</p>

              <b-calendar
              id="ex-disabled-readonly"
                class="calen text-center"
                v-model="value_data"
                :value_data="value_data"
                locale="ru"
              ></b-calendar>

              <div class="container">

              </div>



            </div>

            <div class="col-12 col-lg-6 zapis-table text-start">

              <div v-if="resp_ok" class="alert alert-info" role="alert">Вы успешно записались</div>
              <div v-if="resp_ok">
                <img class="img-fluid img-zapis" src="/header.png" alt />
                <p>Специалист свяжеться с вами в ближайшее время</p>
              </div>
              <div id="new-data" v-if="value_data">
                <div>
                  <Login v-if="login_user" :onClose="onClose" />
                </div>

                <h5>Выбрана дата:{{onsdata(value_data)}}</h5>
                <div v-if="message">
                  <p class="info-user">
                    У специалиста не отмечено время на этот день:
                    <br />Укажите удобное для вас время на указанную дату и специалист свяжеться с вами
                  </p>
                </div>
                <i>{{masterDate}}</i>
                <form v-on:submit="inputData($event)">
                  <div class="container">
                    <div class="row justify-content-start" v-if="!message">
                      <div class="col-12">
                        <p>Выбрать время</p>
                      </div>
                      <div
                        class="time-clock"
                        :class="{ timeclock : active_el == time.id }"
                        @click="timeCostum(time.id)"
                        v-for="time in user_time"
                        :key="time.id"
                      >{{time.time.slice(0,5)}}</div>
                    </div>
                  </div>
                  <label v-if="message" for="time">Выбрать время</label>
                  <br />
                  <input
                    class="time-new"
                    v-if="message"
                    name="time"
                    type="time"
                    required
                    v-model="time"
                  />
                  <br />
                  <label for="phone">Введите номер</label>
                  <br />
                  <input
                    type="tel"
                    v-model="phone_owner"
                    required
                    id="phone"
                    name="phone"
                    placeholder="+7 XXX XXX XX XX"
                  />
                  <br />
                  <div class="d-flex justify-content-end box-sibmit">
                    <button type="submit" class="btn-cal rounded-pill btn mt-2">Записаться</button>
                  </div>
                </form>
              </div>
            </div>
            </div>
            </div>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import Gallery from "@/components/Gallery";
import RegistrationMaster from "@/components/RegistrationMaster";
import Login from "@/components/Login";
export default {
  computed: {
    authName() {
      let name_user = this.$store.state.auth;
      if (name_user === null) {
        return null;
      } else {
        return name_user.user.id;
      }
    },

    imagesList(){
      console.log('ttt');
    for(let photo of this.user.images){
      this.gallery_image.push(photo.images)
      console.log('ttt');
    }
    if (this.gallery_image.length >0){
      this.imag_true = true
      console.log('ttt');
    }
    else{
      console.log('ggg');
      this.imag_true = false
    }
    return this.gallery_image
    },
    masterDate() {
      let headerCalendar = (document.querySelector(
        "#ex-disabled-readonly"
      ).style.display = "block");
      if (this.value_data != "") {
        const date = this.value_data;
        const user = this.user.id;
        const headers = {
          "Content-Type": "application/json"
        };
        const uu = this.$axios
          .$get(
            `https://api-booking.ru/booking_time?date=${date}&user=${user}`,
            {
              headers: headers
            }
          )
          .then(resp => {
            if (resp === null) {
              this.message = true;
            } else {
              this.message = false;
              this.user_time = resp;
            }
          });
      }
    }
  },
  props: [
    "user_id",
    "user",
    "usRating",
    "clickRating",
    "rating_click",
    "ratingChange",
    "authrating",
    "nonrating"
  ],
  data() {
    return {
      home: true,
      zapis: false,
      value_data: "",
      clock: "",
      authoriz: false,
      login_user: false,
      user_time: [],
      message: false,
      time_id: null,
      time: "",
      resp_ok: false,
      phone_owner: "",
      active_el: 0,
      succes: true,
      image: false,
      bigimage: "",
      big_image_index: 0,
      gallery_image:[],
      imag_true:false,
      slide: 0,
      sliding: null


    };
  },
  component: {
    Login,
    RegistrationMaster,
    Gallery
  },

  methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      },
    timeCostum(time) {
      this.clock = time;
      this.active_el = time;
    },
          onsdata(click_data){
      let god = Number(click_data.slice(0,4))

      let mes = Number(click_data.slice(5,7)) -1
      let day = Number(click_data.slice(8,11))
      let vv = new Date(god,mes,day).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });


      return vv
    },
    userRating(rating) {
      let arrRating = [];
      for (var i = 0; i < rating; i++) {
        arrRating.push(1);
      }
      if (arrRating.length != 5) {
        let nonactive = 5 - arrRating.length;
        for (var i = 0; i < nonactive; i++) {
          arrRating.push(0);
        }
      }
      return arrRating;
    },
    openImageIn() {
      this.big_image_index++;
      this.bigimage = this.gallery_image[this.big_image_index];
      if (this.bigimage === undefined) {
        this.big_image_index = 0;
        this.bigimage = this.gallery_image[this.big_image_index];
      }
    },
    openImageUp() {
      this.big_image_index--;
      this.bigimage = this.gallery_image[this.big_image_index];
      if (this.bigimage === undefined) {
        let indList = this.gallery_image.length - 1;
        this.big_image_index = indList;
        this.bigimage = this.gallery_image[this.big_image_index];
      }
    },

    openHome() {
      this.home = true;
      this.zapis = false;
    },
    closeGall() {
      this.image = !this.image;
    },
    onCloseReg() {
      this.authoriz = false;
    },
    openZapis() {
      this.home = false;
      this.zapis = true;
    },
    openImg(ind) {
      // document.querySelector(".img-box").srcset =
      //   smallImg.srcElement.currentSrc;
      this.big_image_index = ind;
      this.bigimage = this.gallery_image[ind];
      this.image = true;
    },
    onCloseTar(event){
      if(event.target.tagName === 'DIV'){
          this.image = !this.image;
        }

    },
    inputData(event) {
      event.preventDefault();
      if (this.time != "") {
        if (this.authName === null) {
          this.login_user = true;
        } else {
          let data = {
            user_id: this.user.id,
            owner_id: this.authName,
            date: this.value_data,
            time: this.time,
            phone_owner: this.phone_owner
          };
          const headers = {
            "Content-Type": "application/json"
          };
          let response = this.$axios
            .$post("https://api-booking.ru/zapis-time", data, {
              headers: headers
            })
            .then(resp => {
              this.value_data = "";
              this.phone_owner = "";
              this.time = "";
              this.resp_ok = true;
              this.succes = false;
              setTimeout(() => {
                this.resp_ok = false;
                this.succes = true;
              }, 5000);

              console.log(resp);
            });
        }
      } else {
        if (this.authName === null) {
          this.authoriz = true;
        } else {
          console.log(this.clock);

          let data = {
            id: Number(this.clock),
            owner_id: this.authName,
            is_booking: false,
            phone_owner: this.phone_owner
          };
          const headers = {
            "Content-Type": "application/json"
          };
          let response = this.$axios
            .$post("https://api-booking.ru/check-time", data, {
              headers: headers
            })
            .then(resp => {
              this.value_data = "";
              this.resp_ok = true;
              console.log(resp);

              setTimeout(() => {
                this.resp_ok = false;
              }, 5000);
            });
        }
      }
    },
    onLogin() {
      console.log("jj");
      this.authoriz = false;
      this.login_user = true;
    },
    onClose() {
      this.authoriz = false;
      this.login_user = false;
    }
  }
};
</script>

<style scoped>


@media(max-width:380px){
.calen {
  min-width: 5em;
  width: 7em;
  font-size: 1px;
  /* position: absolute;
  left: -20px; */
}
}
.b-calendar {
  box-shadow: 7px 5px 15px 9px #add8e629;
  font-size: 0px;
  margin: 4px;
  width: 10rem;
}

@media(max-width: 296px){
  .b-calendar{
    width: 5rem;
    margin-right: 4rem;
  }
}
.b-calendar output {
  display: none;
}
small,
.small {
  display: none;
}
.b-calendar .b-calendar-inner{
  max-width: 70px;
}
.active {
  color: #3cbea6;
  width: 4rem;
}
.timeclock{
  color: #3cbea6;
  width: 4rem;
}
.time-new {
  width: 100%;
  box-shadow: 4px -4px 10px 1px #daecff;
  border: 1px solid lightblue;
}
#phone {
  width: 100%;
  box-shadow: 4px -4px 10px 1px #daecff;
  border: 1px solid lightblue;
}
.box-img{
  border: 1px solid #00000038;
  margin: 1px;
}
input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
}
.info-user {
  background: #ffebcd3b;
}

.zapis-table {
  margin-top: 3rem;
}
.navbar-light .navbar-nav .nav-link {
  color: #000000;
  text-shadow: 2px 2px 2px #00000042;
}

.icons_rating {
  color: blanchedalmond;
  cursor: pointer;
  width: 1.5rem;
}
.active {
  color: aliceblue;
  cursor: pointer;
}
.alert-rating {
  position: absolute;
  z-index: 0;
  width: auto;
  left: 0;
}
.navbar-user {
  background-color: #3cbea6 !important;
  box-shadow: 3px 3px 3px 3px #c6ccd2;
  opacity: 0.7;
  color: black;
}
.profile {
  margin-top: 5rem;
}
.box-sibmit {
  height: 7rem;
}
.box-cal{
  padding: 1rem;
}
.time-clock {
  background: aliceblue;
  border: solid 1px #e0e1e2;
  margin: 3px;
  text-align: center;
  min-width: 7rem;
  height: 2rem;
  cursor: pointer;
}

.img {
  height: 10rem;
  width: 10rem;
  border: 1px solid #3cbea6;
  box-shadow: 2px 2px 2px 2px #e9ecef;
  margin-bottom: 2rem;
}
.gallery-img {
    transition: 1s;
    cursor: pointer;
}
.gallery5 {
  overflow: hidden;
  width: 100%;

}

.gallery5 .ramka {
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
}
.gallery5 img {
  width: 15rem;
  height: 15rem;
  object-fit: cover;
}

.gallery-img:hover {
  filter: grayscale(100%);
  transform: scale(1.1);
}

.new-img {
  width: 100%;
}
.img-box {
  width: 100%;
  min-width: 100%;
}
#ex-disabled-readonly {
  display: none;
}
.btn-cal {
  border: none;
  background: lightblue;
  color: aliceblue;
  box-shadow: 2px 2px 2px #d6d8db;
  height: 2.3rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.47843);
}
select {
  width: 100%;
}
.err {
  color: red;
}
.new-phone {
  width: 100%;
}





.im-avatar{
  height: auto;
  max-width: 100%;
  max-height: 256px;
}






</style>