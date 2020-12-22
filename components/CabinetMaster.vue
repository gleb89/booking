<template>
  <div class="container">
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
      <div class="row justify-content-center">
        <div v-if="home" id="home" class="col-12 mt-3">
          <div class="row">
            <div class="col-12 col-lg-4">
              <img class="img img-fluid rounded-circle" :src="user.avatar" alt width="108rem" />

              <!-- <Rating class="mb-2" /> -->
              <p v-if="!ratingChange">Рейтинг:{{user.rating}}</p>
              <p v-if="ratingChange">Рейтинг:{{ authrating}}</p>
              <div
                v-if="rating_click"
                class="alert-rating alert alert-warning"
                role="alert"
              >Спасибо за оценку!</div>
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
              <p>Услуги:{{user.category.title}}</p>
              <p>Город:{{user.city}}</p>
            </div>
            <div class="col-12 col-lg-8 img-block">
              <h2>Фото работ</h2>
              <div id="photo" class="row justify-content-center">
                <img
                  v-for="(photo,projectIndex) in gallery_image"
                  :key="photo"
                  @click.prevent="openImg(projectIndex)"
                  class="col-12 col-lg-6 mb-2 gallery-img img-fluid"
                  :src="photo"
                  alt
                />
                <!-- <div class="col-12 col-lg-12 block-img">
                  <img
                    class="img-box mb-2 img-fluid"
                    src="https://media.gettyimages.com/photos/skyline-of-berlin-with-tv-tower-at-dusk-picture-id925669312?s=170667a"
                    alt
                  />
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="zapis" v-if="zapis" class="col-12 mt-3">
        <section>
          <div id="calendar-data" class="row">
            <div v-if="succes" class="col-12 col-lg-6 text-center">
              <p>Выберите дату</p>

              <b-calendar
                id="ex-disabled-readonly"
                v-model="value_data"
                :value_data="value_data"
                locale="ru"
              ></b-calendar>
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

                <h5>Выбрана дата: {{value_data}}</h5>
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
                        :class="{ active : active_el == time.id }"
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
        </section>
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
            `https://glebhleb.herokuapp.com/booking_time?date=${date}&user=${user}`,
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
    "authrating"
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
      gallery_image: [
        "https://media.gettyimages.com/photos/skyline-of-berlin-with-tv-tower-at-dusk-picture-id925669312?s=170667a",
        "https://html5css.ru/css/img_lights.jpg",
        "https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg",
        "https://media.gettyimages.com/photos/woman-lifts-her-arms-in-victory-mount-everest-national-park-picture-id507910624?s=612x612"
      ]
    };
  },
  component: {
    Login,
    RegistrationMaster,
    Gallery
  },

  methods: {
    timeCostum(time) {
      this.clock = time;
      this.active_el = time;
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
            .$post("https://glebhleb.herokuapp.com/zapis-time", data, {
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
            .$put("https://glebhleb.herokuapp.com/check-time", data, {
              headers: headers
            })
            .then(resp => {
              this.value_data = "";
              this.resp_ok = true;
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

<style >
.active {
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
  height: auto;
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
.b-calendar .b-calendar-grid-body .col[data-date] .btn {
  width: 32px;
  height: 32px;
  background: white;
  font-size: 14px;
  line-height: 1;
  margin: 3px auto;
  padding: 9px 0;
}
/* .b-calendar output {
  display: none;
} */
small,
.small {
  display: none;
}
.b-calendar .b-calendar-grid-body .col[data-date] .btn {
  color: #28a745;
}
.b-calendar .b-calendar-nav .btn {
  padding: 0.25rem;
  background: none;
}
.b-calendar .b-calendar-grid {
  padding: 0;
  margin: 0;
  overflow: hidden;
  width: auto;
}
.b-calendar {
  box-shadow: 7px 5px 15px 9px #add8e629;
}
.b-calendar .b-calendar-grid {
  border: none;
}
</style>