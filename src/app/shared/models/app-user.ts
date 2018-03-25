import {Card} from 'shared/models/card';

export interface IAppUser {
  ID: string;
  name: string;
  email: string;
  payment: Card;
  address: string;
  isAdmin: boolean;
}
