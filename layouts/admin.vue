<template>
<section id="body">
    <header>
        <NavAdmin/>
    </header>
    <main>
        <Nuxt />
    </main>
    <footer>

    </footer>
    </section>
</template>

<script>
import NavAdmin from "@/components/NavAdmin";
export default {
    data() {
        return {
        showMobileMenu:false
        }
    },
    components:{
        NavAdmin
    },
    methods: {
              menuClick() {
        this.showMobileMenu = ! this.showMobileMenu
        },
    },
}
</script>

<style >
html{
  margin: 0;
  padding: 0;
}
#body {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  position: relative;
}
</style>