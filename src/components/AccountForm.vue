<template>
  <form @submit.prevent="emit('submit')" class="form">
    <h1 class="form-title">Учётные записи</h1>
    <button class="form-submitBtn" type="submit">+</button>
  </form>
</template>
<script setup lang="ts">
const emit = defineEmits(['submit']);
</script>
<style scoped>
.form {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
}

.form-submitBtn {
  width: 40px;
  height: 40px;
  font-size: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
}
</style>