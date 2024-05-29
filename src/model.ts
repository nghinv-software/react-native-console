export type ClientInfo = {
  id: string;
  name: string;
  platform: string;
  debug: boolean;
  isSimulator: boolean;
  version?: string;
  buildVersion?: string;
  model?: string;
  manufacturer?: string;
  os?: string;
  osVersion?: string;
  language?: string;
  timeZone?: string;
  userAgent?: string;
  screenWidth?: number;
  screenHeight?: number;
  screenScale?: number;
  windowWidth?: number;
  windowHeight?: number;
  windowScale?: number;
  isPortrait?: boolean;
  isLandscape?: boolean;
  isDarkMode?: boolean;
};

export type LogType =
  | 'log'
  | 'info'
  | 'warn'
  | 'error'
  | 'group'
  | 'groupCollapsed'
  | 'groupEnd'
  | 'clear'
  | 'debug'
  | 'assert'
  | 'count'
  | 'trace';

export type RequestData = {
  timestamp: number;
  logType: LogType;
  secure: boolean;
  payload: any;
  language: string;
};
