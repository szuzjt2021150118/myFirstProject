<script setup>
import top from './components/top.vue'
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
   <top/>
   <div class="container1">
    <Sidebar />
    <RouterView/>
   </div>
    
</template>


<style>
.container1{
    display: flex;
}
</style>