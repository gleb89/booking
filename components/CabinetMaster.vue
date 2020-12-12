<template>
  <div class="container">
    <div class="profile">
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
              <img
                class="img img-fluid rounded-circle"
                src="https://atlantgrup.ru/wa-data/public/site/themes/dummy2/img/pages/page-32-2.png"
                alt
                width="108rem"
              />

              <!-- <Rating class="mb-2" /> -->
              <p>Рейтинг:4.5</p>
              <p>Специалист:{{user.name}}</p>
              <p>Услуги:Маникюр</p>
              <p>Город:{{user.city}}</p>
            </div>
            <div class="col-12 col-lg-8 img-block">
              <h2>Фото работ</h2>
              <div id="photo" class="row justify-content-center gallery">
                <img
                  @click.prevent="openImg($event)"
                  class="col-4 col-lg-2 mb-2 gallery-img img-fluid"
                  src="https://media.gettyimages.com/photos/skyline-of-berlin-with-tv-tower-at-dusk-picture-id925669312?s=170667a"
                  alt
                />
                <img
                  @click.prevent="openImg($event)"
                  class="col-4 col-lg-2 mb-2 gallery-img img-fluid"
                  src="https://media.gettyimages.com/photos/woman-lifts-her-arms-in-victory-mount-everest-national-park-picture-id507910624?s=612x612"
                  alt
                />
                <img
                  @click.prevent="openImg($event)"
                  class="col-4 col-lg-2 mb-2 gallery-img img-fluid"
                  src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                  alt
                />
                <img
                  @click.prevent="openImg($event)"
                  class="col-4 col-lg-2 mb-2 gallery-img img-fluid"
                  src="https://html5css.ru/css/img_lights.jpg"
                  alt
                />
                <img
                  @click.prevent="openImg($event)"
                  class="img col-4 col-lg-2 mb-2 gallery-img img-fluid"
                  src="https://media.gettyimages.com/photos/skyline-of-berlin-with-tv-tower-at-dusk-picture-id925669312?s=170667a"
                  alt
                />
                <img
                  @click.prevent="openImg($event)"
                  class="col-4 col-lg-2 mb-2 gallery-img img-fluid"
                  src="https://media.gettyimages.com/photos/skyline-of-berlin-with-tv-tower-at-dusk-picture-id925669312?s=170667a"
                  alt
                />

                <div class="col-12 col-lg-12 block-img">
                  <img
                    class="img-box mb-2 img-fluid"
                    src="https://media.gettyimages.com/photos/skyline-of-berlin-with-tv-tower-at-dusk-picture-id925669312?s=170667a"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="zapis" v-if="zapis" class="col-12 mt-3">
        <section>
          <div id="calendar-data" class="row">
            <div class="col-12 col-lg-6 text-center">
              <p>Выберите дату</p>

              <b-calendar id="ex-disabled-readonly" v-model="value_data" :value_data="value_data" locale="ru"></b-calendar>
            </div>
            <div class="col-12 col-lg-6 text-start">
              <div
                v-if="resp_ok"
                class="alert alert-info"
                role="alert"
              >Вы успешно записались</div>
              <div v-if="resp_ok">
                <img class="img-fluid img-zapis" src="/header.png" alt="">
                <p>Специалист свяжеться с вами в ближайшее время</p>
              </div>
              <div id="new-data" v-if="value_data">
                <div>
                  <RegistrationMaster
                    v-if="authoriz"
                    class="mt-5"
                    :onCloseReg="onCloseReg"
                    :onLogin="onLogin"
                  />
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
                  <!-- <select required v-if="!message" v-model="clock">
                    <option
                      v-for="time in user_time"
                      :key="time.id"
                      v-bind:value="time.id"
                    >{{time.time.slice(0,5)}}</option>
                  </select> -->
                  <div class="container">
                  <div class="row justify-content-start" v-if="!message">
                    <div class="col-12">
                      <p>Выбрать время</p>

                    </div>
                    <div class=" time-clock" :class="{ active : active_el == time.id }"  @click="timeCostum(time.id)"  v-for="time in user_time"
                      :key="time.id" >{{time.time.slice(0,5)}}</div>
                  </div>
                  </div>
                  <label v-if="message" for="time">Выбрать время</label>
                  <br>
                  <input class="time-new" v-if="message" name="time" type="time" required v-model="time"  />
                  <br>
                  <label for="phone">Введите номер </label>
                  <br>
                  <input
                    type="tel"
                    v-model="phone_owner"
                    required
                    id="phone"
                    name="phone"
                    placeholder="+7 XXX XXX XX XX"
                  />
                  <br>
                  <button type="submit" class="btn-cal btn mt-2 ">Записаться</button>
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

import Login from "@/components/Login";
import RegistrationMaster from "@/components/RegistrationMaster";
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
      let headerCalendar = document.querySelector('#ex-disabled-readonly').style.display = 'block'
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
  props: ["user_id", "user"],
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
      active_el:0

    };
  },
  component: {
    Login,
    RegistrationMaster
  },
  methods: {
    timeCostum(time){
      this.clock = time
      this.active_el = time;

    },
    openHome() {
      this.home = true;
      this.zapis = false;
    },
    onCloseReg() {
      this.authoriz = false;
    },
    openZapis() {
      this.home = false;
      this.zapis = true;
    },
    openImg(smallImg) {
      document.querySelector(".img-box").srcset =
        smallImg.srcElement.currentSrc;
    },
    inputData(event) {
      event.preventDefault();
      if (this.time != "") {
        if (this.authName === null) {
          this.authoriz = true;
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
              setTimeout(() => {
                this.resp_ok = false;
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
            id: Number(this.clock) ,
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
              this.value_data = ''
              this.resp_ok = true
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
#phone{
    width: 100%;
    box-shadow: 4px -4px 10px 1px #daecff;
    border: 1px solid lightblue;
}
input[type="time"]::-webkit-calendar-picker-indicator {
   filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
}
.info-user{
  background: #ffebcd3b;
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


.time-clock{
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
  height: 4rem;
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
#ex-disabled-readonly{
  display: none;
}
.btn-cal {
  border: 1px solid black;
  background: lightblue;;
  color: aliceblue;
  box-shadow: 2px 2px 2px #d6d8db;
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
small, .small {
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
</style>