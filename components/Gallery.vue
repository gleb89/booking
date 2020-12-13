<template>
<div class="gallery">
    <div class="container">
        <div class="row">
            <div class="col-12  d-flex justify-content-end">
              <fa @click="closeGall()" class="m-2 icons-close" icon="times"></fa>
              </div>
              <div class="col-12 d-flex justify-content-center align-items-center image-box">
                  <div class="row">
                <div class="col-12 d-flex justify-content-center">
              <img class="img-fluid  " :src="bigimage" alt="">
              </div >
              <div class="col-12 d-flex justify-content-center">
                  <fa @click="openImageUp()" class="m-2 icons" icon="long-arrow-alt-left"></fa>
                  <fa @click="openImageIn()" class="m-2 icons" icon="long-arrow-alt-right"></fa>
              </div>
              </div>

              </div>
              </div>
              </div>
        </div>
</template>

<script>
export default {
    props:['image ', 'openImageIn', 'openImageUp', 'gallery_image', 'bigimage', 'closeGall'],

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
    opacity: 0.95;
}
.close-gallery{
    text-align: end;
}
.image-box{
    height: 100vh;
}
.icons{
    cursor: pointer;
    font-size: 3rem;
    color: #f0f8ff5e;
}
.icons-close{
    color: aliceblue;
    font-size: 2rem;
}
</style>