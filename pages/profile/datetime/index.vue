<template>
    <div class="container">
          <div id="calendar-data mt-4" class="row">
            <div  class="col-12 col-lg-6 data text-center">
              <p>Выберите дату</p>
              <b-calendar
                id="ex-disabled-readonly"
                v-model="user_data"
              ></b-calendar>
              {{ondate}}
            </div>
            <div class="col-12 col-lg-6 zapis-table text-start">
                <p class="show-data">Выбрана дата: {{user_data}}</p>
                <p>Выбрано время: {{time}}</p>
                <div>

                    <form v-on:submit="inputTime($event)" action="">
                    <input
                    class="time-new"
                    name="time"
                    type="time"
                    required
                    v-model="time"
                  />
                  <br>
                  <button type="submit" class="btn-cal rounded-pill btn mt-2">добавить время</button>
                  <div class="row justify-content-center p-1">
                  <div v-if="alerts" class="col-12 alert new-alert alert-danger" role="alert">
                      Не выбрана дата
                  </div>
                  </div>
                  </form>
                  <div class="row mt-5 block-date">

                <div class="col-lg-3 col-6 box-time" v-for="time in timeAppend" :key="time.id">
                <p >Время: <br>{{time.uptime}}
                <fa class="checks"  icon="check"></fa>
                </p>
                <p>Дата: <br>{{time.update}} </p>
                </div>
                </div>
                </div>

          </div>
    </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    computed:{
    ondate(){
      if (this.user_data != ''){
        let headerCalendar = (document.querySelector(
        "#ex-disabled-readonly"
      ).style.display = "block");
      this.alerts = false
      }
      }
    },
    data() {
        return {
             user_data:'',
             time:'',
             timeAppend:[],
             alerts:false,

        }
    },
    methods: {
    inputTime($event){
        event.preventDefault()
        let user_id = this.$store.state.auth.user.id

        if (this.user_data){
                this.timeAppend.push({'uptime':this.time,'update':this.user_data})
                let data =
                {
                  "user_id": user_id,
                  "time": this.time,
                  "date": this.user_data,
                  "is_booking": true
                }
                const headers = {
                "Content-Type": "application/json"
                };
            this.$axios
            .$post("https://glebhleb.herokuapp.com/booking-create_time", data, {
              headers: headers
          })

               .then(
          res => {
            console.log(res);

          },
          error => {
              console.log(error);

          }
        );

        }
        else{
            this.alerts = true
              setTimeout(() => {
                this.alerts = false
              }, 2000);

        }
    },
    }
}
</script>

<style >
.data{
    margin-top: 8rem;
}
.show-data{
    margin-top: 15rem;
}
@media (max-width: 500px) {
.show-data{
      margin-top: 2rem;
  }
}
@media (max-width: 500px) {
  .block-date{
      justify-content: center;
  }
}

.checks{
  color: green;
}


.box-time{
  background: aliceblue;
  margin: 2px;
}

.btn-cal {
  border: none;
  background: lightblue;
  color: aliceblue;
  box-shadow: 2px 2px 2px #d6d8db;
  height: 2.3rem;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.47843);
}
.new-alert{
  position: absolute;
  z-index: 0;
}
.time-new {
  width: 100%;
  box-shadow: 4px -4px 10px 1px #daecff;
  border: 1px solid lightblue;
}
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
#ex-disabled-readonly{
  display: none;
  width: 100%;
}
</style>