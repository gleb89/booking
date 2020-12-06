<template>
  <div class="container">
    <!-- <h1>{{ id }}</h1> -->
    <nav class="navbar navbar-light navbar-user" >
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
            <p>Специалист:{{user_id}}</p>
            <p>Услуги:Маникюр</p>
            <p>Город:Волгоград</p>
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
  <div v-if="submit_form">
    <h4 class="text-center">Вы успешно записались</h4>
        <h5 class="text-center">Выбрана дата: {{ value_data }}</h5>
        <h5 class="text-center">Выбрано время: {{ clock }}</h5>
    <p class="text-center">Специалист перезвонит вам для подтверждения</p>
  </div>
  <div id="calendar-data" class="row">
    <div  class="col-12 col-lg-4">
      <p>Выберите дату</p>
      <b-calendar  v-model="value_data" :value_data="value_data"></b-calendar>
    </div>
    <div class="col-12 col-lg-8">
      <div id="new-data" v-if="value_data">
        <h5>Выбрана дата: {{ value_data }}</h5>
        <h5>Выбрано время: {{ clock }}</h5>

<form @submit.prevent="checkForm"
  ref="form_time">
  <div class="form-group">
    <input type="hidden" v-model="value_data">
  <select v-model="clock" >
    <option value="" >Выбрать время</option>
  <option  v-for="time in ['11-00','12-00','19-00']" :key="time">{{ time }}</option>
</select>
<p>
  <label for="phone">Введите номер телефона</label>
  <input class="new-phone" name="phone" type="number" v-model="telephone" placeholder="введите 11 значный номер">
</p>
<p>
  <label for="name">Введите имя</label>
  <input class="name" name="name" type="text" v-model="name" placeholder="введите имя" required>
</p>
    <p v-if="errors.length">
      <p class="err" v-for="error in errors" :key="error">{{ error }}</p>
name
  </div>

  <button type="submit" value="Submit" class="btn-cal btn-primary">Записаться</button>
</form>

      </div>
      <div v-else>Дата не выбрана</div>

    </div>
  </div>
</section>
    </div>
  </div>
</template>

<script>
// import Rating from "@/components/main/Rating";
// import Calendar from "@/components/main/Calendar";
export default {
  props: ["user_id"],
  data() {
    return {
    //   id: this.$route.params.id,
      home: true,
      zapis: false,
      value_data: "",
      clock: "",
      errors: [],
      check: false,
      submit_form:false,
      telephone:'',
      name:''
    };
  },
  component: {
    // Rating,
    // Calendar
  },
  methods: {
    openHome() {
      this.home = true;
      this.zapis = false;
    },
    openZapis() {
      this.home = false;
      this.zapis = true;
    },
    openImg(smallImg) {
      document.querySelector(".img-box").srcset =
        smallImg.srcElement.currentSrc;
    },
    checkForm() {
      console.log();
      if (this.clock && this.telephone){
        if(this.telephone.length === 11){
          document.getElementById('calendar-data').style.display = 'none'
          this.submit_form= true
          return true
        }
      }
      this.errors = [];
      if(!this.clock){
        this.errors.push('Требуется выбрать время');
        return false
    }
      if(this.telephone.length != 11){
        this.errors.push('Введите 11 значный номер');
        return false
      }
    }

  }
};
</script>

<style scoped>
.navbar-user {
  background-color: #3cbea6 !important;
  box-shadow: 3px 3px 3px 3px #c6ccd2;
}
.container {
  margin-top: 10rem;
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
.btn-cal {
  border: 1px solid black;
  background: #007bff63;
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
</style>