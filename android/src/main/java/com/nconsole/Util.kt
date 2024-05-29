package com.nconsole

import android.content.Context
import android.content.pm.ApplicationInfo
import android.os.Build
import android.provider.Settings

object Util {
  fun isDebuggable(context: Context): Boolean {
    return context.applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE != 0
  }

  val isEmulator: Boolean by lazy {
    return@lazy (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic")
      || Build.FINGERPRINT.startsWith("generic")
      || Build.FINGERPRINT.startsWith("unknown")
      || Build.HARDWARE.contains("goldfish")
      || Build.HARDWARE.contains("ranchu")
      || Build.MODEL.contains("google_sdk")
      || Build.MODEL.contains("Emulator")
      || Build.MODEL.contains("Android SDK built for x86")
      || Build.MANUFACTURER.contains("Genymotion")
      || Build.PRODUCT.contains("sdk_google")
      || Build.PRODUCT.contains("google_sdk")
      || Build.PRODUCT.contains("sdk")
      || Build.PRODUCT.contains("sdk_x86")
      || Build.PRODUCT.contains("vbox86p")
      || Build.PRODUCT.contains("emulator")
      || Build.PRODUCT.contains("simulator"))
  }

  fun getImei(context: Context): String {
    return Settings.Secure.getString(context.contentResolver, Settings.Secure.ANDROID_ID)
  }
}
