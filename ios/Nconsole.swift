
@objc(Nconsole)
class Nconsole: NSObject {

    @objc(getDeviceInfo:withRejecter:)
      func getDeviceInfo(resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
            let device = UIDevice.current
            let info: [String: Any] = [
              "id": device.identifierForVendor?.uuidString,
              "name": device.name,
              "isSimulator": device.name.contains("Simulator"),
              "version": device.systemVersion,
              "buildVersion": Bundle.main.infoDictionary?["CFBundleVersion"] as? String,
              "model": device.model,
              "manufacturer": "Apple",
              "os": "iOS",
              "osVersion": device.systemVersion,
              "userAgent": "iOS"
            ]
          
          resolve(info)
      }
}
