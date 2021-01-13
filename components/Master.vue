<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-4">
        <img
          class="img img-prof rounded-circle"
          v-if="new_image"
          :src="new_image"
          alt
          width="108rem"
        />
        <br />
        <input
          v-if="resimage"
          id="ttt"
          name="myFile"
          type="file"
          @change="resImage($event)"
        />
        <br />
        <button
          class="btn btn-soxr rounded-pill"
          v-if="updateIm"
          @click="postImage"
        >
          сохранить
        </button>
        <button
          class="btn rounded-pill btn-otmena"
          v-if="resimage"
          @click="(resimage = !resimage), (updateIm = false)"
        >
          отмена
        </button>
        <button
          class="btn btn-change-image rounded-pill"
          v-if="!resimage"
          @click="resimage = true"
        >
          изменить изображение
        </button>
      </div>
      <div class="p-text col-12">
        <p>
          <span> <fa icon="file-signature"></fa>Имя: </span>
          {{ user_name }}
        </p>
        <p>
          <input v-if="change" type="text" v-model="user_name" />
        </p>
        <p>
          <span> <fa icon="envelope"></fa>Почта: </span>
          {{ user_email }}
        </p>
        <p>
          <input v-if="change" type="text" v-model="user_email" />
        </p>
        <p>
          <span> <fa icon="building"></fa>Город: </span>
          {{ user_city }}
        </p>
        <p>
          <input v-if="change" type="text" v-model="user_city" />
        </p>
        <p>
          <span> <fa icon="list-ol"></fa>Категория: </span>
        </p>
        <div v-if="!category_id.title">{{ user_category.title }}</div>
        <div v-if="category_id.title">{{ category_id.title }}</div>

        <select
          v-if="change"
          id="cityUser"
          class="form-control"
          v-model="category_id"
        >
          <option value selected>Выбрать Категории</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat">
            {{ cat.title }}
          </option>
        </select>
        <p>
          <span> <fa icon="star-half-alt"></fa>Мой рейтинг: </span>
          {{ user.rating }}
        </p>
        <button
          class="btn btn-ch rounded-pill"
          v-if="!change"
          @click="changeNew"
        >
          изменить данные
        </button>
        <button
          class="btn rounded-pill btn-otmena"
          v-if="change"
          @click="nonChange"
        >
          отмена
        </button>
        <button
          class="btn btn-soxr rounded-pill"
          v-if="change"
          @click="changeData"
        >
          сохранить
        </button>
      </div>
      <div class="p-text col-12 text-center ">
        <h3>Все мои фото</h3>
        <div
          v-if="user_images.length > 0 && list_add_images.length === 0"
          id="photo"
          class=" justify-content-center p-1"
        >
          <img
            v-for="photo in user_images"
            :key="photo.id"
            class="img gallery-img img-fluid  p-1 m-1"
            :src="photo.images"
            alt
          />
        </div>
        <div
          v-if="list_add_images.length > 0"
          id="photo"
          class="row justify-content-center p-1"
        >
          <img
            v-for="photo in list_add_images"
            :key="photo.id"
            class="img gallery-img img-fluid  p-1 m-1"
            :src="photo"
            alt
          />
        </div>

        <div
          v-if="user_images.length === 0 && list_add_images.length === 0"
          id="photo"
          class="container"
        >
          <h4>Вы еще не загрузили фото</h4>
          <br />
        </div>
        <div class="container" style="font-size: 1rem; padding: 1rem">
          <div class="row justify-content-center">
            <div class="col-12" style="padding: 1rem">
              <p class="pp text-center">
                Добавить
                <br />изображение
              </p>
              <input
                id="mmm"
                type="file"
                name="myFile"
                class="form-control-file text-center"
                style="font-size: 14px; margin-top: 1rem"
                @change="addImages($event)"
              />
              <span v-if="err_image" style="color:red">Изображение не выбрано</span>
              <button
                class="btn btn-primary rounded-pill"
                style="margin-top: 1rem"
                @click="postaddImages"
              >
                сохранить
          <b-spinner
          v-if="add_im"
          class="noactive btn-con"
         
          label="Spinning"
        ></b-spinner>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  computed: {},
  data() {
    return {
      tt: "",
      select: null,
      select_images: null,
      change: false,
      new_image: this.user.avatar,
      category: false,
      categories: [],
      user_name: this.user.name,
      user_email: this.user.email,
      user_city: this.user.city,
      user_category: this.user.category,
      user_images: this.user.images,
      category_id: {},
      resimage: false,
      updateIm: false,
      list_add_images: [],
      err_image:false,
      add_im:false
    };
  },
  methods: {
    changeData() {
      let category_id;
      if (this.category_id.id) {
        category_id = this.category_id.id;
      } else {
        category_id = this.user.category.id;
      }

      const data = {
        id: this.user.id,
        name: this.user_name,
        email: this.user_email,
        master: true,
        category: category_id,
        city: this.user_city,
      };
      console.log(data);

      const headers = {
        "Content-Type": "application/json",
      };
      this.$axios
        .$put(`https://glebhleb.herokuapp.com/reset_user`, data, {
          headers: headers,
        })
        .then((resp) => {
          this.user_category = this.category_id;
          this.change = !this.change;
        });
    },

    changeNew() {
      const headers = {
        "Content-Type": "application/json",
      };
      this.$axios
        .$get(`https://glebhleb.herokuapp.com/categories/`, {
          headers: headers,
        })
        .then((resp) => {
          this.categories = resp;
          this.change = true;
        });
    },
    resImage(event) {
      console.log("ll");

      this.select = event.target.files[0];
      this.updateIm = true;
    },
    addImages(event) {
      this.select_images = event.target.files[0];
    },
    nonChange() {
      (this.user_name = this.user.name),
        (this.user_email = this.user.email),
        (this.user_city = this.user.city),
        (this.user_category = this.user.category);
      this.category_id = {};
      this.change = !this.change;
    },
    postaddImages() {
      if (this.select_images === null){
        this.err_image = true
        setTimeout(() => {
          this.err_image = false
        }, 2000);

      }
      else{
    this.add_im = true
      const formData = new FormData();
      formData.append("image", this.select_images, this.select_images.name);
      const headers = {
        "Content-Type": "application/json",
      };
      this.$axios
        .$post(
          `https://glebhleb.herokuapp.com/add-images/${this.user.id}`,
          formData,
          {
            headers: headers,
          }
        )
        .then((resp) => {
          let arrImages = [];
          if (this.user_images.length === 0) {
            this.list_add_images.push(resp);
            console.log(this.list_add_images);
          } else {
            this.list_add_images = [];
            for (let photo of this.user_images) {
              arrImages.push(photo.images);
            }
            arrImages.push(resp);
            this.list_add_images = arrImages;
          }
          this.add_im = false
        });
        }
    },

    postImage() {
      
      const formData = new FormData();
      formData.append("image", this.select, this.select.name);
      const headers = {
        "Content-Type": "application/json",
      };
      this.$axios
        .$put(
          `https://glebhleb.herokuapp.com/add-image/${this.user.id}`,
          formData,
          {
            headers: headers,
          }
        )
        .then((resp) => {
          this.new_image = resp;
          this.updateIm = false;
          this.resimage = false;
        });
    },
  },
};
</script>

<style scoped>
.img-prof {
  width: 20rem;
  max-width: 20rem;
  height: auto;
  margin-top: 5rem;
  box-shadow: -6px 3px 9px 2px #0000004a;
}
.p-text {
  font-size: 2rem;
  margin-bottom: 10rem;
  background: #ffffff;
  box-shadow: 4px 6px 6px 5px #3f51b542;
  margin-top: 2rem;
  padding: 2rem;
}
.img {
  height: 10rem;
  width: 10rem;
  border: 1px solid #3cbea6;
  box-shadow: 2px 2px 2px 2px #e9ecef;
  margin-bottom: 2rem;
}
.pp {
  font-size: 1rem;
}
.spinner-border{
  width: 1rem;
    height: 1rem;
}
.btn-change-image {
  margin-top: 2rem;
  background: cornflowerblue;
  color: white;
  box-shadow: 7px 3px 7px 3px #00000082;
  border: none;
}
.btn-soxr {
  margin-top: 2rem;
  background: cornflowerblue;
  color: white;
  box-shadow: 7px 3px 7px 3px #00000082;
  border: none;
}
.btn-ch {
  margin-top: 2rem;
  background: #3dc0a7;
  color: white;
  box-shadow: 7px 3px 7px 3px #00000082;
  border: none;
}
.btn-otmena {
  margin-top: 2rem;
  border: none;
  background: #007bff54;
  color: white;
}
span path {
  color: deepskyblue;
}
</style>