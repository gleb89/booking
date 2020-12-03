<template>
  <div class="container ">
      <div class="row justify-content-center">
    <div v-for="user of users" :key="user.id" class="card col-12 col-lg-3 m-4" >
      <img class="card-img-top" src="" alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title">{{ user.name}}</h5>
        <hr>
        <p>Стоматолог</p>
        <p>Город:{{ user.city}}</p>
        <p
          class="card-text">
        <!-- <Rating/> -->
        </p>
        <button @click="openUser(user.id)" class="btn rounded-pill">Смотреть</button>

      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
    props:["users","openUser","items"],
    methods: {

    },
}
</script>

<style >
    .card {
    border-radius: 0% 20%;
    border: 1px solid #3cbfa6;
    box-shadow: 5px 5px 5px 5px #00000042;
}
.card:hover{
    background-color: #f0f8f6;
}
.btn {
    background: #3cbfa7;
    box-shadow: 3px 3px 3px #0000007a;
}
</style>