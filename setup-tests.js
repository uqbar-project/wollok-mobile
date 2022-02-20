import { NativeModules as RNNativeModules } from "react-native";
RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
    State: { BEGAN: "BEGAN", FAILED: "FAILED", ACTIVE: "ACTIVE", END: "END" },
    attachGestureHandler: jest.fn(),
    createGestureHandler: jest.fn(),
    dropGestureHandler: jest.fn(),
    updateGestureHandler: jest.fn(),

};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
    forceTouchAvailable: false
};

const localizeMock = {
    findBestAvailableLanguage: () => ({ languageTag: 'es', isRTL: 'false' }),
    getLocales: () => [
        { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
        { countryCode: 'EC', languageTag: 'es-EC', languageCode: 'es', isRTL: false },
    ],
    getNumberFormatSettings: () => ({
        decimalSeparator: '.',
        groupingSeparator: ',',
    }),
    getCalendar: () => 'gregorian', // or "japanese", "buddhist"
    getCountry: () => 'ES', // the country code you want
    getCurrencies: () => [], // USD, EUR, ...
    getTemperatureUnit: () => 'celsius', // or "fahrenheit"
    getTimeZone: () => 'Argentina/BuenosAires', // the timezone you want
    uses24HourClock: () => true,
    usesMetricSystem: () => true,
    addEventListener: () => { },
    removeEventListener: () => { },
};

jest.mock('react-native-localize', () => localizeMock)
jest.mock('react-native-paper', () => {
    const RealModule = jest.requireActual('react-native-paper');
    return {
        ...RealModule,
        Portal: ({ children }) => children
    };
});

// Stop animations
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.useFakeTimers();
