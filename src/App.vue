<script setup>
import { onMounted } from "vue";
import { useThemeStore } from "./stores/themeStore";
import Navbar from "./Components/Navbar.vue";
import Footer from "./Components/Footer.vue";
import Toast from "./Components/Toaster.vue";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme();
});
</script>

<template>
    <navbar />
    <router-view />
    <Footer />
    <Toast />
    
</template>

<style scoped>
</style>
