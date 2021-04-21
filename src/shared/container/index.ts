import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';
import '@modules/locations/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IAddressRepository from '@modules/adresses/repositories/IAddressRepository';
import AddressRepository from '@modules/adresses/infra/typeorm/repositories/AddressRepository';

import IUnitsRepository from '@modules/units/repositories/IUnitsRepository';
import UnitsRepository from '@modules/units/infra/typeorm/repositories/UnitsRepository';

import IRadiosRepository from '@modules/radios/repositories/IRadiosRepository';
import RadiosRepository from '@modules/radios/infra/typeorm/repositories/RadiosRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

container.registerSingleton<IUnitsRepository>(
  'UnitsRepository',
  UnitsRepository,
);

container.registerSingleton<IRadiosRepository>(
  'RadiosRepository',
  RadiosRepository,
);
