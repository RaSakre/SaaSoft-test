<template>
  <div class="main">
    <div class="container">
      <AccountForm @submit="addAccountOnPage" />
      <div class="hint">
        <div class="question">?</div>
        <p class="hint-text">Для указания нескольких метох для одной пары логин/пароль используйте разделитель ;</p>
      </div>
      <div class="spans-wrapper">
        <div class="label-spans">
          <span class="label-text">Метки</span>
        </div>
        <div class="label-spans label-spans_select">
          <span class="label-text">Тип записи</span>
        </div>
        <div class="label-spans">
          <span class="label-text">Логин</span>
        </div>
        <div class="label-spans">
          <span class="label-text">Пароль</span>
        </div>
      </div>
      <AccountItem v-for="account in accountStore.accounts" :key="account.id" :account="account" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore } from './store/accounts';
import AccountForm from './components/AccountForm.vue';
import AccountItem from './components/AccountItem.vue';

const accountStore = useAccountsStore();

const addAccountOnPage = (): void => {
  accountStore.addAccount()
}

</script>

<style scoped>
.main {
  padding: 15px 0px;
}

.hint {
  display: flex;
  gap: 15px;
  align-items: center;
  background-color: rgba(22, 177, 177, 0.2);
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 30px;
}

.question {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

.hint-text {
  font-size: 16px;
  color: #000;
  line-height: 1.5;
}

.spans-wrapper {
  display: flex;
}

.label-spans {
  flex-grow: 0.17;
  margin-bottom: 10px;
}

.label-spans_select {
  flex-grow: 0.07
}
</style>
