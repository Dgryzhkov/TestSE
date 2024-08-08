package com.testse

import com.facebook.react.ReactActivity
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactInstanceManager
import android.os.Bundle

class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String {
        return "TestSE" 
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        

        val host: ReactNativeHost = reactNativeHost
        if (host.useDeveloperSupport) {
            val instanceManager: ReactInstanceManager = host.reactInstanceManager
            instanceManager.createReactContextInBackground()
        }
    }
}