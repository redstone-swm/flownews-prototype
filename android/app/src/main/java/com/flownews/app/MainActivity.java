package com.flownews.app;

import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    public void onStart() {
        super.onStart();
        WebView webView = this.bridge.getWebView();
        if(BuildConfig.ALLOW_MIXED_CONTENT){
            webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }
    }
}
