import WebSocket from 'ws';

export default interface IClientWebsocketProvider {
  connect(reconnectAttempt: boolean): void;
}
