import { NativeModules, Platform } from 'react-native';
import type { ClientInfo } from './model';

const LINKING_ERROR =
  `The package 'react-native-nconsole' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const NconsoleDeviceInfo = NativeModules.Nconsole
  ? NativeModules.Nconsole
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function getDeviceInfo(): Promise<ClientInfo> {
  return NconsoleDeviceInfo.getDeviceInfo();
}
