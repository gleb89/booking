<template>
<div class="gallery">
    <div class="container">
        <div @click="onCloseTar($event)" class="row ">
            <div class="col-12 close-box  d-flex justify-content-end">
              <fa @click="closeGall()" class="icons-close" icon="times"></fa>
              </div>
              <div class="col-12 d-flex justify-content-center align-items-center image-box">
                  <div class="container">
                  <div class="row">
                <div class="col-12 b-im d-flex justify-content-center ">
                <div class="pbox">
              <img class="img-bigs img-fluid" :src="bigimage" alt="">
              </div>
              </div >
              <div class="col-12 button-img d-flex justify-content-center">
                  <fa @click="openImageUp()" class="m-2 icons" icon="long-arrow-alt-left"></fa>
                  <fa @click="openImageIn()" class="m-2 icons" icon="long-arrow-alt-right"></fa>
              </div>
              </div>
              </div>

              </div>
              </div>
              </div>
        </div>
</template>

<script>
export default {
    props:['image ', 'openImageIn', 'openImageUp', 'gallery_image', 'bigimage', 'closeGall','onCloseTar'],

data() {
    return {

    }
},
methods: {

},
}
</script>

<style >
.gallery{
    width: 100%;
    background: #495057;
    height: 100vh;
    position: absolute;
    left: 0;
    z-index: 1;
    /* opacity: 0.95; */
    top: 0;
    position: fixed;
}
.close-gallery{
    text-align: end;
}
.close-box{
    padding-top: 4rem;
}
.image-box{
    height: 100vh;
}
.icons{
    cursor: pointer;
    font-size: 3rem;
    color: #f0f8ff5e;
}
.button-img{
    margin-bottom: 8rem;
}
.pbox{
    padding: 1rem;
}
.icons-close{
    color: aliceblue;
    font-size: 2rem;
    cursor: pointer;
}
.b-im{
    padding: 1rem;
}
.img-bigs{
    max-width: 15rem;
    height: auto;
}
</style>