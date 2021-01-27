<template>
   <div class="profile">
      <Gallery
        v-if="image"
        :closeGall="closeGall"
        :openImageUp="openImageUp"
        :bigimage="bigimage"
        :openImageIn="openImageIn"
        :gallery_image="gallery_image"
        :onCloseTar="onCloseTar"
      />
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
      <div v-if="home" class="row justify-content-center">
        <div  id="home" class="col-12 mt-3">
          <div class="row">
            <div class="col-12 col-lg-4">
              <div class="p-1">
              <img class="im-avatar img img-fluid " :src="user.avatar" alt />
              </div>
              <!-- <Rating class="mb-2" /> -->
              <p v-if="!ratingChange">Рейтинг:{{user.rating}}</p>
              <p v-if="ratingChange">Рейтинг:{{ authrating}}</p>
              <div
                v-if="rating_click"
                class="alert-rating alert alert-warning"
                role="alert"
              >Спасибо за оценку!</div>
              <div
                v-if="nonrating"
                class="alert-rating alert alert-danger"
                role="alert"
              >Нужна регистрация!</div>
              <p v-if="!ratingChange">
                <fa
                  v-for="(star,index) of usRating(user.rating)"
                  :key="
          star.id"
                  @click="clickRating(index+1,user.id)"
                  :class="{active : active_el == star }"
                  class="icons_rating"
                  icon="star"
                ></fa>
              </p>
              <p v-if="ratingChange">
                <fa
                  v-for="(star,index) of usRating(authrating)"
                  :key="
          star.id"
                  @click="clickRating(index+1,user.id)"
                  :class="{active : active_el == star }"
                  class="icons_rating"
                  icon="star"
                ></fa>
              </p>
              <p>Специалист:{{user.name}}</p>
              <p v-if="user.category">Услуги:{{user.category.title}}</p>
              <p>Город:{{user.city}}</p>
              <p v-if="user.phone">Телефон: {{user.phone}}</p>
            </div>
            <div class="col-12 col-lg-8 img-block">
              <h2>Фото работ</h2>
              <div class="container">
              <div class="row gallery5 ">
                 <div v-if="user.images.length > 0" id="photo" class="row justify-content-center p-1">
                <div  v-for="(photo,projectIndex) in imagesList" :key="photo.id" class="ramka text-center col-12 col-lg-4 ">
                <img
                  @click.prevent="openImg(projectIndex)"
                  class="gallery-img img-fluid "
                  :src="photo"
                  alt
                />
                </div>
              </div>
              </div>
              </div>
              <div v-if="user.images.length === 0"  id="photo" class="row justify-content-center">
                <h4>Мастер еще не загрузил фото</h4>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div id="zapis" v-if="zapis" class="row justify-content-center">
         
          <div id="calendar-data" class="col-12 mt-3">
            <div class="container">
            <div class="row">
            <div v-if="succes" class="col-12 col-lg-6 ">
              <p>Выберите дату</p>
              
              
              <!-- <b-calendar
                v-model="value_data"
                :value_data="value_data"
                locale="ru"
              ></b-calendar> -->

              
            </div>
            
            <div class="col-12 col-lg-6 zapis-table text-start">
              
              <div v-if="resp_ok" class="alert alert-info" role="alert">Вы успешно записались</div>
              <div v-if="resp_ok">
                <img class="img-fluid img-zapis" src="/header.png" alt />
                <p>Специалист свяжеться с вами в ближайшее время</p>
              </div>
              <div id="new-data" v-if="value_data">
                <div>
                  <Login v-if="login_user" :onClose="onClose" />
                </div>

                <h5>Выбрана дата:{{onsdata(value_data)}}</h5>
                <div v-if="message">
                  <p class="info-user">
                    У специалиста не отмечено время на этот день:
                    <br />Укажите удобное для вас время на указанную дату и специалист свяжеться с вами
                  </p>
                </div>
                <i>{{masterDate}}</i>
                <form v-on:submit="inputData($event)">
                  <div class="container">
                    <div class="row justify-content-start" v-if="!message">
                      <div class="col-12">
                        <p>Выбрать время</p>
                      </div>
                      <div
                        class="time-clock"
                        :class="{ timeclock : active_el == time.id }"
                        @click="timeCostum(time.id)"
                        v-for="time in user_time"
                        :key="time.id"
                      >{{time.time.slice(0,5)}}</div>
                    </div>
                  </div>
                  <label v-if="message" for="time">Выбрать время</label>
                  <br />
                  <input
                    class="time-new"
                    v-if="message"
                    name="time"
                    type="time"
                    required
                    v-model="time"
                  />
                  <br />
                  <label for="phone">Введите номер</label>
                  <br />
                  <input
                    type="tel"
                    v-model="phone_owner"
                    required
                    id="phone"
                    name="phone"
                    placeholder="+7 XXX XXX XX XX"
                  />
                  <br />
                  <div class="d-flex justify-content-end box-sibmit">
                    <button type="submit" class="btn-cal rounded-pill btn mt-2">Записаться</button>
                  </div>
                </form>
              </div>
            </div>
            </div>
            </div>
          </div>
          </div>
      </div>
    
</template>