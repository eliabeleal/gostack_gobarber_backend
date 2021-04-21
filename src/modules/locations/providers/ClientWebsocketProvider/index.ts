import { container } from 'tsyringe';
import ClientWebsocketProvider from './implementations/ClientWebsocketProvider';
import IClientWebsocketProvider from './models/IClientWebsocketProvider';

const providers = {
  websocket: ClientWebsocketProvider,
};

container.registerSingleton<IClientWebsocketProvider>(
  'ClientWebsocketProvider',
  providers.websocket,
);
