<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
          <nuxt-link no-prefetch class="nav-link" to="/">
        На главную
     </nuxt-link>
           <nuxt-link no-prefetch class="nav-link" to="/profile">
        Профиль
     </nuxt-link>
      <nuxt-link no-prefetch class="nav-link" to="#">
        Новые записи
     </nuxt-link>
      <nuxt-link no-prefetch class="nav-link" to="#">
        Все Записи
     </nuxt-link>
      <nuxt-link no-prefetch class="nav-link" to="#">
        Добавить дату и время
     </nuxt-link>


      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    </div>
</template>