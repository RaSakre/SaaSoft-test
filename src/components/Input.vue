<template>
  <div class="input-wrapper">
    <input 
      ref="passwordInput" 
      :type="type" 
      :placeholder="placeholder" 
      v-model="model"
      :name="name"  
      class="input" 
      :style="[error ? 'border: 1px solid red' : null]"
      @blur="emit('blur', model || '')"
    />
    <slot />
    <div v-if="type === 'password'" class="input-eye" @click="togglePasswordVisibility">
      <img :src="isPasswordVisible ? passwordEyeIconHide : passwordEyeIcon" alt="Toggle visibility" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import passwordEyeIcon from '../assets/passwordEyeShow.svg';
import passwordEyeIconHide from '../assets/passwordEyeClose.svg';

interface Props {
  type: string;
  placeholder: string;
  name?: string;
  error?: string;
}

const model = defineModel<string>();

const emit = defineEmits<{
  blur: [value: string] 
}>()

defineProps<Props>();
const isPasswordVisible = ref(false);
const passwordInput = useTemplateRef('passwordInput');


const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
  if (passwordInput.value) {
    passwordInput.value.type = isPasswordVisible.value ? 'text' : 'password';
  }
};
</script>
<style scoped>
.input-wrapper {
  position: relative;
  width: fit-content;
}

.input-eye {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
}

.input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  transition: all 0.3s ease;
}
</style>