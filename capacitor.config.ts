import type {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'kr.sijeom',
    appName: 'sijeom',
    server: {
        url: 'https://sijeom.kr',
        cleartext: false
    },
    plugins: {
        StatusBar: {
            overlaysWebView: false,
            style: 'LIGHT',
            backgroundColor: '#0B1021'
        }
    }
};


export default config;
