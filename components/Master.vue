<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-4">
        <img class="img-prof" v-if="new_image" :src="new_image" alt width="108rem" />
        <br />
        <input v-if="resimage" id="ttt"  name="myFile" type="file" @change="resImage($event)" />
        <br />
        <button class="btn btn-soxr rounded-pill " v-if="updateIm" @click="postImage">сохранить</button>
        <button
          class="btn rounded-pill btn-otmena "
          v-if="resimage"
          @click="resimage = !resimage,updateIm = false"
        >отмена</button>
        <button
          class="btn btn-change-image rounded-pill"
          v-if="!resimage"
          @click="resimage = true"
        >изменить изображение</button>
        <div class="p-text">
          <p>
            <span><fa icon="file-signature"></fa> Имя:</span>
            {{user_name}}
          </p>
          <p>
            <input v-if="change" type="text" v-model="user_name" />
          </p>
          <p>
            <span><fa icon="envelope"></fa> Почта:</span>
            {{user_email}}
          </p>
          <p>
            <input v-if="change" type="text" v-model="user_email" />
          </p>
          <p>
            <span><fa icon="building"></fa> Город:</span>
            {{user_city}}
          </p>
          <p>
            <input v-if="change" type="text" v-model="user_city" />
          </p>
          <p>
            <span><fa icon="list-ol"></fa> Категория:</span>
            <div v-if="!category_id.title">{{user_category.title}}</div>
            <div v-if="category_id.title">{{category_id.title}}</div>


          <select v-if="change" id="cityUser" class="form-control" v-model="category_id">
            <option value selected>Выбрать Категории</option>
            <option v-for="cat in categories" :key="cat.id" :value="(cat)">{{cat.title}}</option>
          </select>
          <p>
            <span><fa icon="star-half-alt"></fa> Мой рейтинг:</span>
            {{user.rating}}
          </p>
          <button class="btn btn-ch rounded-pill" v-if="!change" @click="changeNew">изменить данные</button>
          <button class="btn rounded-pill btn-otmena" v-if="change" @click="nonChange">отмена</button>
          <button class="btn btn-soxr rounded-pill" v-if="change" @click="changeData">сохранить</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      tt: "",
      select: null,
      change: false,
      new_image: this.user.avatar,
      category: false,
      categories: [],
      user_name: this.user.name,
      user_email: this.user.email,
      user_city: this.user.city,
      user_category: this.user.category,
      category_id: {},
      resimage: false,
      updateIm: false
    };
  },
  methods: {
    changeData() {


      const data = {
        id: this.user.id,
        name: this.user_name,
        email: this.user_email,
        master: true,
        category: Number(this.category_id.id),
        city: this.user_city
      };
      const headers = {
        "Content-Type": "application/json"
      };
      this.$axios
        .$put(`https://glebhleb.herokuapp.com/reset_user`, data, {
          headers: headers
        })
        .then(resp => {
          this.user_category = this.category_id;
          this.change = !this.change;
        });
    },

    changeNew() {
      const headers = {
        "Content-Type": "application/json"
      };
      this.$axios
        .$get(`https://glebhleb.herokuapp.com/categories/`, {
          headers: headers
        })
        .then(resp => {
          this.categories = resp;
          this.change = true;
        });
    },
    resImage(event) {
      console.log('ll');

      this.select = event.target.files[0];
      this.updateIm = true;
    },
    nonChange(){
      this.user_name = this.user.name,
      this.user_email = this.user.email,
      this.user_city = this.user.city,
      this.user_category = this.user.category
      this.category_id = {}
      this.change = !this.change
    },

    postImage() {
      const formData = new FormData();
      formData.append("image", this.select, this.select.name);
      const headers = {
        "Content-Type": "application/json"
      };
      this.$axios
        .$put(
          `https://glebhleb.herokuapp.com/add-image/${this.user.id}`,
          formData,
          {
            headers: headers
          }
        )
        .then(resp => {
          this.new_image = resp;
          this.updateIm = false;
          this.resimage = false;
        });
    }
  }
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
.btn-change-image {
  margin-top: 2rem;
    background: cornflowerblue;
    color: white;
    box-shadow: 7px 3px 7px 3px #00000082;
    border: none;
}
.btn-soxr{
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
span path{

  color: deepskyblue;;
}
</style>