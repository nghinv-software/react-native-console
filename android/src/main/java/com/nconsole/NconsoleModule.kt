package com.nconsole

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class NconsoleModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun getDeviceInfo(promise: Promise) {
    val resultMap = Arguments.createMap()

    resultMap.putString("id", Util.getImei(reactContext))
    resultMap.putString("name", android.os.Build.MODEL)
    resultMap.putString("platform", "Android")
    resultMap.putString("version", android.os.Build.VERSION.RELEASE)
    resultMap.putString("os", "Android")
    resultMap.putString("osVersion", android.os.Build.VERSION.RELEASE)
    resultMap.putString("language", java.util.Locale.getDefault().language)
    resultMap.putString("userAgent", "Android")
    resultMap.putString("timeZone", java.util.TimeZone.getDefault().id)
    resultMap.putBoolean("isSimulator", false)
    resultMap.putString("buildVersion", android.os.Build.VERSION.SDK_INT.toString())
    resultMap.putString("model", android.os.Build.MODEL)
    resultMap.putString("manufacturer", android.os.Build.MANUFACTURER)
    resultMap.putBoolean("isSimulator", Util.isEmulator)
    resultMap.putBoolean("debug", Util.isDebuggable(reactContext))

    promise.resolve(resultMap)
  }

  companion object {
    const val NAME = "Nconsole"
  }
}
