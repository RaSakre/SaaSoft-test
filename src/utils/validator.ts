import type { ErrorFields, IAccount } from "../types/account-types";

interface IValidationRules {
  required: (value: any) => string | boolean;
  minLength: (length: number) => (value: any) => string | boolean;
  maxLength: (length: number) => (value: any) => string | boolean;
}

export const Validators: IValidationRules = {
  required: (value: string) => {
    if (!value) return "Обязательное поле";
    return true;
  },
  minLength: (length: number) => {
    return (value: string) => {
      if (value.length < length) return `Минимальная длина ${length} символов`;
      return true;
    };
  },
  maxLength: (length: number) => {
    return (value: string) => {
      if (value.length > length) return `Максимальная длина ${length} символов`;
      return true;
    };
  },
};

export const isErrorField = (field: keyof IAccount): field is ErrorFields => {
  return ["login", "password", "tags"].includes(field as string);
};
