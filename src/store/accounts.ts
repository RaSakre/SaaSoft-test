import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { IAccount } from "../types/account-types";
import { Account } from "../types/account-types";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts: Ref<IAccount[]> = ref<IAccount[]>([]);

  const addAccount = () => {
    const newAccount = new Account();
    const existingAccounts = JSON.parse(
      localStorage.getItem("accounts") || "[]"
    );
    existingAccounts.push(newAccount);
    localStorage.setItem("accounts", JSON.stringify(existingAccounts));
    accounts.value = existingAccounts;
  };

  const deleteAccount = (id: string) => {
    accounts.value = accounts.value.filter((acc) => acc.id !== id);
    localStorage.setItem("accounts", JSON.stringify(accounts.value));
  };

  const updateAccount = <K extends keyof IAccount>(
    field: K,
    value: IAccount[K],
    id: string
  ) => {
    const account = accounts.value.find((account) => account.id === id);
    if (account) {
      account[field] = value;
      localStorage.setItem("accounts", JSON.stringify(accounts.value));
    }
  };

  const loadAccounts = () => {
    const saved = localStorage.getItem("accounts");
    if (saved) {
      accounts.value = JSON.parse(saved);
    }
  };

  loadAccounts();

  return {
    accounts,
    addAccount,
    deleteAccount,
    updateAccount,
    loadAccounts,
  };
});
