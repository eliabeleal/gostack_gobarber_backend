import { inject, injectable } from 'tsyringe';
import IClientWebsocketProvider from '../providers/ClientWebsocketProvider/models/IClientWebsocketProvider';

@injectable()
class SubscriptionLocationService {
  constructor(
    @inject('ClientWebsocketProvider')
    private websocketProvider: IClientWebsocketProvider,
  ) {}

  async execute(): Promise<void> {
    this.websocketProvider.connect(true);
  }
}

export default SubscriptionLocationService;
