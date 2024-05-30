import { getDeviceInfo } from './DeviceInfo';
import type { ClientInfo, LogType, RequestData } from './model';

const _kDefaultUri = 'ws://localhost:9090';

export class NConsole {
  private static _instance?: NConsole;

  private static get instance(): NConsole {
    if (!this._instance) {
      this._instance = new NConsole();
    }
    return this._instance;
  }

  _isEnable: boolean = false;

  _publicKey?: string;

  _uri: string = _kDefaultUri;

  _webSocket?: WebSocket;

  _clientInfo?: ClientInfo;

  _useSecure: boolean = false;

  _listenLog?: (data: any[], logType: LogType) => void;

  public static setUseSecure(useSecure: boolean) {
    this.instance._useSecure = useSecure;
  }

  public static setUri(uri: string) {
    this.instance._uri = uri;
  }

  public static setPublicKey(publicKey: string) {
    this.instance._publicKey = publicKey;
  }

  public static setLogListener(
    listener: (data: any[], logType: LogType) => void
  ) {
    this.instance._listenLog = listener;
  }

  public static get isEnable(): boolean {
    return this.instance._isEnable;
  }

  public static set isEnable(value: boolean) {
    this.instance._isEnable = value;
  }

  public static get uri(): string {
    return this.instance._uri;
  }

  public static setClientInfo(clientInfo?: ClientInfo) {
    this.instance._clientInfo = clientInfo;
  }

  public static log(...args: any[]) {
    this.instance._sendRequest('log', args);
  }

  public static error(...args: any[]) {
    this.instance._sendRequest('error', args);
  }

  public static warn(...args: any[]) {
    this.instance._sendRequest('warn', args);
  }

  public static info(...args: any[]) {
    this.instance._sendRequest('info', args);
  }

  public static debug(...args: any[]) {
    this.instance._sendRequest('debug', args);
  }

  public static trace(...args: any[]) {
    this.instance._sendRequest('trace', args);
  }

  public static clear() {
    this.instance._sendRequest('clear', []);
  }

  public static group(...args: any[]) {
    this.instance._sendRequest('group', args);
  }

  public static groupCollapsed(...args: any[]) {
    this.instance._sendRequest('groupCollapsed', args);
  }

  public static groupEnd() {
    this.instance._sendRequest('groupEnd', []);
  }

  private _getUri(uri?: string): string {
    if (uri == null || uri === undefined) {
      return _kDefaultUri;
    }

    var uriNew = uri.trim();

    if (!uriNew.startsWith('ws://') && !uriNew.startsWith('wss://')) {
      uriNew = 'ws://' + uriNew;
    }

    const uriParts = uriNew.split(':');

    if (uriParts.length === 3) {
      return uriNew;
    }

    if (uriParts.length === 2) {
      const ipPaths = uriParts[1]!!.split('.');

      if (ipPaths.length === 4) {
        return `${uriNew}:9090`;
      }

      if (uriParts[1] === 'localhost') {
        return `${uriNew}:9090`;
      }

      return uriNew;
    }

    return uriNew;
  }

  // private _genHexString(len: number): string {
  //   const hex =
  //     '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   let output = '';

  //   for (let i = 0; i < len; ++i) {
  //     output += hex[Math.floor(Math.random() * hex.length)];
  //   }

  //   return output;
  // }

  private _encode(data: string) {
    if (!this._publicKey || !this._useSecure) {
      return {
        data,
        encryptionKey: undefined,
      };
    }

    return {
      data,
      encryptionKey: undefined,
    };
  }

  private async _sendRequest(type: LogType, data: any[]) {
    if (!this._isEnable) {
      return;
    }

    this._listenLog?.(data, type);

    if (this._clientInfo == null) {
      this._clientInfo = await getDeviceInfo();
    }

    const payloadData = {
      clientInfo: this._clientInfo,
      data: data,
    };

    const payload = this._encode(JSON.stringify(payloadData));
    const dataRequest: RequestData = {
      timestamp: Date.now(),
      logType: type,
      secure: payload.encryptionKey != null,
      payload: payload,
      language: 'react-native',
    };

    if (this._webSocket?.readyState === WebSocket.OPEN) {
      try {
        this._webSocket.send(JSON.stringify(dataRequest));
      } catch (error) {}
      return;
    }

    this._connectWebSocket(JSON.stringify(dataRequest));
  }

  private async _connectWebSocket(data?: string) {
    if (this._webSocket && this._webSocket.readyState === WebSocket.OPEN) {
      if (data) {
        try {
          this._webSocket?.send(data);
        } catch (error) {}
      }
      return;
    }

    if (this._webSocket) {
      this._webSocket.close();
    }

    try {
      this._webSocket = new WebSocket(this._getUri(this._uri));
      this._webSocket.onopen = () => {
        if (data) {
          try {
            this._webSocket?.send(data);
          } catch (error) {}
        }
      };
    } catch (e) {
      // Do nothing
    }
  }
}
