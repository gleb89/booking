<template>
    <div>
        <img v-if="new_image" :src="new_image" alt="" width="108rem">
            <input v-if="change" id="ttt" name="myFile" type="file" @change="resImage($event)" >
            <button @click="postImage">отправить</button>
        <p>Имя:{{user_name}}  </p>
        <p><input v-if="change" type="text" v-model="user_name"></p>
        <p>Почта:{{user_email}} </p>
        <p><input v-if="change" type="text" v-model="user_email"></p>
        <p>Город:{{user_city}} </p>
        <p><input v-if="change" type="text" v-model="user_city"></p>
        <p v-if="user_category">Категория:{{user_category}}</p>
            <select v-if="change" id="cityUser" class="form-control" v-model="category_id">
            <option value selected>Выбрать Категории</option>
            <option v-for="cat in categories"  :key="cat.id" :value="(cat)">{{cat.title}}</option>
          </select>
             <button v-if="!user_category" @click="changeCategory">Добавить</button>
        <div v-if="category">
            <p v-for="categ of categories" :key="
            categ.id">{{categ.title}}</p>
        </div>
        <p>Мой рейтинг:{{user.rating}}</p>
        <button v-if="!change" @click="changeNew">изменить данные</button>
        <button v-if="change" @click="changeData">сохранить</button>
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
            user_category:this.user.category.title,
            category_id:{}
        }
    },
    methods: {
        changeData(){
        const data = {
            id: this.user.id,
            name: this.user_name,
            email: this.user_email,
            master: true,
            category:Number(this.category_id.id),
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
            this.user_category = this.category_id.title
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
        })
    }
    }

}
</script>