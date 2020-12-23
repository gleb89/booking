<template>
    <div class="container">
        <div class="row">
        <div class="col-12">
        <img class="img-prof" v-if="new_image" :src="new_image" alt="" width="108rem">
        <br>
            <input v-if="resimage"  id="ttt" name="myFile" type="file" @change="resImage($event)" >
            <br>
            <button class="btn rounded-pill"  v-if="updateIm" @click="postImage">сохранить</button>
            <button class="btn rounded-pill btn-otmena" v-if="resimage" @click="resimage = !resimage">отмена</button>
            <button class="btn rounded-pill" v-if="!resimage" @click="resimage = true">изменить изображение</button>
        <div class="p-text">
        <p><span>Имя:</span> {{user_name}}  </p>
        <p><input v-if="change" type="text" v-model="user_name"></p>
        <p><span>Почта:</span> {{user_email}} </p>
        <p><input v-if="change" type="text" v-model="user_email"></p>
        <p><span>Город:</span> {{user_city}} </p>
        <p><input v-if="change" type="text" v-model="user_city"></p>
        <p v-if="user_category"><span>Категория:</span> {{user_category.title}}</p>
            <select v-if="change" id="cityUser" class="form-control" v-model="category_id">
            <option value selected>Выбрать Категории</option>
            <option v-for="cat in categories"  :key="cat.id" :value="(cat)">{{cat.title}}</option>
          </select>

        <div v-if="category">
            <p v-for="categ of categories" :key="
            categ.id">{{categ.title}}</p>
        </div>
        <p><span>Мой рейтинг:</span> {{user.rating}}</p>
        <button class="btn rounded-pill" v-if="!change" @click="changeNew">изменить данные</button>
        <button class="btn rounded-pill" v-if="change" @click="changeData">сохранить</button>
        </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['user'],
    data() {
        return {
            tt:'',
            select:null,
            change:false,
            new_image:this.user.avatar,
            category:false,
            categories:[],
            user_name:this.user.name,
            user_email:this.user.email,
            user_city:this.user.city,
            user_category:this.user.category,
            category_id:{},
            resimage:false,
            updateIm:false
        }
    },
    methods: {
        changeData(){
        let category_true
        if (this.category_id.id === undefined){
            category_true = Number(this.user.category.id)
        }
        else{
            category_true = Number(this.category_id.id)
        }

        const data = {
            id: this.user.id,
            name: this.user_name,
            email: this.user_email,
            master: true,
            category:category_true,
            city: this.user_city
        }
        const headers = {
        "Content-Type": "application/json"
        };
        this.$axios
        .$put(`https://glebhleb.herokuapp.com/reset_user`, data,{
          headers: headers
        })
        .then(
           resp => {
            console.log(resp);
            if (this.category_id.title){
                this.user_category = this.category_id.title
            }
            else{
                this.user_category = this.user_category
            }
        console.log(this.user_category);

            this.change = !this.change


           })
        },

        changeNew(){
        const headers = {
        "Content-Type": "application/json"
        };
        this.$axios
        .$get(`https://glebhleb.herokuapp.com/categories/`, {
          headers: headers
        })
        .then(
           resp => {
            this.categories = resp
            this.change = true

           })

        },
    resImage(event){
        this.select = event.target.files[0]
        this.updateIm = true
    },

    postImage(){
        const formData = new FormData()
        formData.append('image', this.select, this.select.name)
        const headers = {
        "Content-Type": "application/json"
        };
        this.$axios
        .$put(`https://glebhleb.herokuapp.com/add-image/${this.user.id}`,formData, {
        headers: headers
        })
        .then(
        resp => {
            this.new_image = resp
            this.updateIm = false
            this.resimage = false
        })
    }
    }

}
</script>

<style scoped>


.img-prof{
    width: 20rem;
    max-width: 20rem;
    height: auto;
    margin-top: 5rem;
    box-shadow: -6px 3px 9px 2px #0000004a;
}
.p-text{
    font-size: 2rem;
    margin-bottom: 10rem;
    background: #ffffff;
    box-shadow: 4px 6px 6px 5px #0000004a;
    margin-top: 2rem;
    padding: 2rem;
}
.btn {
    margin-top: 2rem;
  background: #3cbfa7;
  color: white;
  box-shadow: 3px 3px 3px #0000007a;
}
.btn-otmena{
    background: #007bff54;
}
span{
    font-weight: 900;
}
</style>