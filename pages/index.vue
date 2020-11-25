<template>
  <div class="container">
    <section id="header" class="mt-1">
      <div class="row">
        <div class="discripchion col-12 col-lg-6 mb-4 mb-lg-0">
          <h1 class="text-left">Запишись</h1>
          <hr />
          <p class="about text-left">
            Сервис
            <br />для записи-онлайн
            <br />в вашем городе
          </p>
        </div>
        <div class="img_header col-12 col-lg-6 mb-4 mb-lg-0">
          <img class="img-fluid" src="/header.png" />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
// import SpecialistsList from "@/components/main/SpecialistsList";
export default {
}
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap");
.discripchion {
  margin-top: 7rem;
  font-family: "Raleway", sans-serif;
}

.img_header {
  margin-top: 6rem;
}
h1 {
  font-size: 4.5rem;
}
.about {
  font-size: 3.5rem;
}


@media (max-width: 500px) {
  .discripchion {
    order: 2;
  }
}
@media (max-width: 500px) {
  .about {
    font-size: 2rem;
  }
}

</style>
