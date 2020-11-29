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
      <!-- <Calendar /> -->
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
      zapis: false
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
</style>