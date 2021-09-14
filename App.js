import React, { useState } from 'react';
import * as Font from 'expo-font';
import { StatusBar as ExpoStatusBar} from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar} from 'react-native';

import MealsNavigator from './src/navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';
import Colors from './src/constants/Colors';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error)=> console.warn(error)}
      />
    );
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, backgroundColor: Colors.primaryColor}}>
      <Provider store={store}>
        <MealsNavigator /> 
      </Provider>
    </SafeAreaView>
    <ExpoStatusBar style='auto'/>
    </>
    
    );
}