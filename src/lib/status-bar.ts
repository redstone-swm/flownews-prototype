import {Capacitor} from "@capacitor/core";
import {StatusBar} from "@capacitor/status-bar";

// Configure status bar for mobile
export const configureStatusBar = async () => {
    if (Capacitor.isNativePlatform()) {
        try {
            await StatusBar.setOverlaysWebView({ overlay: false });
            await StatusBar.setBackgroundColor({ color: '#323b86' });
        } catch (error) {
            console.log('StatusBar configuration failed:', error);
        }
    }
};