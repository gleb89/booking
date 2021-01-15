<template>
<div class="container">
    <h2 class="mt-5">Мои записи</h2>
    <div class="row justify-content-center p-2">
        
        
        <div v-for="user of user_time" :key="user.id" class="col-lg-4 col-12 conf">
        <p>
            <fa class="icons" icon='sitemap'></fa>
            Категория услуг: 
            <span>{{user.user_category.title}}</span>
            
        </p>    
      <p><fa class="icons" icon="calendar-alt"></fa>Дата:  <span>{{user.date}}</span></p>
      <p>
        <fa class="icons" icon="clock"></fa>Время: <span> {{user.time}}</span> 
      </p>
      <p >
        <fa class="icons" icon="user-clock"></fa>Имя мастера:  <span>{{user.name_master}}</span>
        
      </p>
      <p >
        <fa class="icons" icon="mobile-alt"></fa>
        Номер мастера :
        <span>{{user.phone_master}}</span>
      </p>
      <p>
        <fa class="icons-red" v-if="!user.master_confirm" icon="ban"></fa>
        <fa class="icons-blue" v-if="user.master_confirm" icon="calendar-check"></fa> 
         <span v-if="user.master_confirm">Запись подтверждена</span> 
        <span v-if="!user.master_confirm">Запись не подтверждена</span> 
      </p>
        <button
          class="btn-del  rounded-pill btn"
        >
          отменить
        </button>
    
   
      </div>
        
    </div>

</div>
    
</template>

<script>
export default {
    layout: 'admin',
         asyncData({ $axios,store, error }) {
        const headers = {
        "Content-Type": "application/json"
      };
      const user_id = Number(store.state.auth.user.id)
       return $axios
        .$get(`https://glebhleb.herokuapp.com/booking-data-user/${user_id}`, {
          headers: headers
        })
        .then(
          user_time => {
            return {user_time}
          })

      },
}
</script>

<style scoped>
.conf {
  min-height: 16rem;
  padding: 1rem;
  margin: 1rem;
  background: white;
  box-shadow: -3px 5px 10px 3px #3f51b542;
}
.icons{
    color:#3fc1aa;;
}
.icons-red{
    color: red;
}
.icons-blue{
    color: blue;
}
span{
    font-weight: 800;
}

.btn-del {
  margin-top: 2rem;
  background: cornflowerblue;
  color: white;
  box-shadow: 7px 3px 7px 3px #00000082;
  border: none;
}
</style>