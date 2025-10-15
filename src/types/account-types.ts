import { v4 as uuidv4 } from "uuid";

export interface IAccount {
  id: string;
  tags: ITag[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface ITag {
  text: string;
}

export type AccountType = "LDAP" | "Local";

export class Account implements IAccount {
  id: string = uuidv4();
  login: string = "";
  password: string | null = null;
  tags: ITag[] = [];
  type: AccountType = "Local";
}

export type ErrorFields = "login" | "password" | "tags";
