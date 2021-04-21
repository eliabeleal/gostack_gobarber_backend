/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */
import { injectable } from 'tsyringe';
import WebSocket from 'ws';
import IWebsocketProvider from '../models/IClientWebsocketProvider';

@injectable()
export default class WebsocketProvider implements IWebsocketProvider {
  public debug = false;

  public reconnectInterval = 2000;

  public timeoutInterval = 5000;

  public readyState: number;

  private forcedClose = false;

  private timedOut = false;

  private protocols: string[] = [];

  private websocket: WebSocket | null;

  private url: string;

  public static debugAll = true;

  public onopen: (ev: Event) => void = function (event: Event) {};

  public onclose: (ev: CloseEvent) => void = function (event: CloseEvent) {};

  public onconnecting: () => void = function () {};

  public onmessage: (ev: MessageEvent) => void = function (
    event: MessageEvent,
  ) {};

  public onerror: (ev: Event) => void = function (event: Event) {};

  constructor() {
    this.url = `${process.env.GEODEVICE_EVENTS_WEBSOCKET_URI}`;
    this.protocols = [];
    this.readyState = WebSocket.CONNECTING;
    this.connect(false);
  }

  public connect(reconnectAttempt: boolean): void {
    this.websocket = new WebSocket(this.url, this.protocols);
    this.onconnecting();

    this.log('ReconnectingWebSocket', 'attempt-connect', this.url);

    const localWs = this.websocket;

    const timeout = setTimeout(() => {
      this.log('ReconnectingWebSocket', 'connection-timeout', this.url);
      this.timedOut = true;
      localWs.close();
      this.timedOut = false;
    }, this.timeoutInterval);

    this.websocket.onopen = (event: Event) => {
      clearTimeout(timeout);
      this.log('ReconnectingWebSocket', 'onopen', this.url);
      this.readyState = WebSocket.OPEN;
      // eslint-disable-next-line no-param-reassign
      reconnectAttempt = false;
      this.onopen(event);
    };

    this.websocket.onclose = (event: CloseEvent) => {
      clearTimeout(timeout);
      this.websocket = null;
      if (this.forcedClose) {
        this.readyState = WebSocket.CLOSED;
        this.onclose(event);
      } else {
        this.readyState = WebSocket.CONNECTING;
        this.onconnecting();
        if (!reconnectAttempt && !this.timedOut) {
          this.log('ReconnectingWebSocket', 'onclose', this.url);
          this.onclose(event);
        }
        setTimeout(() => {
          this.connect(true);
        }, this.reconnectInterval);
      }
    };

    this.websocket.onmessage = event => {
      this.log('ReconnectingWebSocket', 'onmessage', this.url);
      // this.log('ReconnectingWebSocket', 'onmessage', this.url, event.data);
      this.onmessage(event);
    };

    this.websocket.onerror = event => {
      this.log('ReconnectingWebSocket', 'onerror', this.url, event);
      this.onerror(event);
    };

    // this.websocket.on('open', () => {
    //   console.log('[websocket] connected');
    // });

    // this.websocket.on('ping', () => {
    //   clearTimeout(this.pingTimeout);
    //   this.pingTimeout = setTimeout(() => {
    //     this.websocket.terminate();
    //   }, 10000 + 1);
    // });

    // this.websocket.on('close', this.closeWebSocket);

    // this.websocket.on('error', this.errorWebSocket);
  }

  private log(...args: unknown[]) {
    if (this.debug || WebsocketProvider.debugAll) {
      console.debug(...args);
    }
  }

  public close(): boolean {
    if (this.websocket) {
      this.forcedClose = true;
      this.websocket.close();
      return true;
    }
    return false;
  }
}
