<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">Freelance</div>
    <ul class="navbar-menu">
      <li><router-link to="/">Все задачи</router-link></li>
      <li><router-link to="/new">Создать</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar'
};
</script>

<style scoped lang="less"></style>
