<template>
  <div class="items-list">
    <label class="input-label" for="">
      <Input @blur="(value: string) => handleBlur('tags', value)" type="text" :error="errors.tags" placeholder="Tags"
        v-model="tagsInput" />
      <span class="error" v-if="errors.tags">{{ errors.tags }}</span>
    </label>
    <label class="select-label" for="select">
      <select @change="handleChangeType(localAccount.type)" class="item-select" v-model="localAccount.type" id="select">
        <option value="LDAP">LDAP</option>
        <option value="Local">Локальная</option>
      </select>
    </label>
    <label class="input-label" for="">
      <Input @blur="(value: string) => handleBlur('login', value)" type="text" :error="errors.login"
        v-model="localAccount.login" placeholder="Login" />
      <span class="error" v-if="errors.login">{{ errors.login }}</span>
    </label>
    <label class="input-label" for="">
      <Input @blur="(value: string) => handleBlur('password', value)" type="password" :error="errors.password"
        v-model="passwordValue" placeholder="Password" />
      <span class="error" v-if="errors.password">{{ errors.password }}</span>
    </label>
    <div @click="deleteAcc" class="trash">
      <img src="../assets/trash.svg" alt="">
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  account: IAccount
}
const props = defineProps<Props>()
import { useAccountsStore } from '../store/accounts';
import Input from './Input.vue';
import type { AccountType, ErrorFields, IAccount } from '../types/account-types';
import { computed, ref, type Ref } from 'vue';
import { Validators, isErrorField } from '../utils/validator';



const accountStore = useAccountsStore()
const localAccount: Ref<IAccount> = ref<IAccount>({
  ...props.account
})

const errors = ref<Record<ErrorFields, string>>({
  login: '',
  password: '',
  tags: '',
});


const handleBlur = (field: keyof IAccount, value: string): void => {
  if (isErrorField(field)) {
    if (validate(field, value)) {
      errors.value[field] = '';

      if (localAccount.value.type === 'LDAP' && field === 'password') {
        accountStore.updateAccount('password', null, localAccount.value.id);
      } else if (field === 'tags') {
        accountStore.updateAccount('tags', localAccount.value.tags, localAccount.value.id);
      } else {
        accountStore.updateAccount(field, value, localAccount.value.id);
      }
    }
  }
}

const tagsInput = computed({
  get: () => {
    return localAccount.value.tags.map(tag => tag.text).join('; ');
  },
  set: (value: string) => {
    const tagsArray = value.split(';')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
      .map(tag => ({ text: tag }));

    localAccount.value.tags = tagsArray;
  }
});



const handleChangeType = (value: AccountType): void => {
  if (value === 'LDAP') {
    accountStore.updateAccount('password', null, localAccount.value.id);
  } else {
    accountStore.updateAccount('password', localAccount.value.password, localAccount.value.id);
  }
  accountStore.updateAccount('type', value, localAccount.value.id);

}

const passwordValue = computed({
  get: () => localAccount.value.password || '',
  set: (value: string) => {
    localAccount.value.password = value || null;
  }
});


const validate = (field: ErrorFields, value: string): boolean => {
  const rules = {
    login: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    password: [Validators.required, Validators.minLength(6), Validators.maxLength(100)],
    tags: [Validators.maxLength(50)]
  };

  const fieldRules = rules[field];

  if (!fieldRules) return true;

  for (const rule of fieldRules) {
    const result = rule(value);
    if (typeof result === 'string') {
      errors.value[field] = result;
      return false;
    }
  }
  return true;
}


const deleteAcc = (): void => {
  accountStore.deleteAccount(localAccount.value.id)
}
</script>
<style scoped>
.items-list {
  display: flex;
  gap: 15px;
}

.items-list:not(:last-child) {
  margin-bottom: 20px;
}

.label-text {
  display: inline-block;
  margin-bottom: 10px;
  color: gray;
  font-size: 15px;
  opacity: 0.7;
}

.trash {
  display: flex;
  cursor: pointer;
}

.trash img {
  width: 40px;
  height: 40px;
}

.error {
  font-size: 13px;
  color: red;
}

.item-select {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  padding: 0 10px;
  font-size: 16px;
}
</style>