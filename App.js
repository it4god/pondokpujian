import React, { Component } from "react";
import { StyleSheet, } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import HomeScreen from "./screens/HomeScreen";
import AlbumScreen from "./screens/AlbumScreen";
import AudioScreen from "./screens/AudioScreen";
import BundleSermonScreen from "./screens/BundleSermonScreen";
import SermonScreen from "./screens/SermonScreen";
const Stack = createNativeStackNavigator();
import * as eva from '@eva-design/eva';
import TrackPlayer from 'react-native-track-player';
import { SafeAreaProvider } from 'react-native-safe-area-context';
global.MyTrackPlayer = TrackPlayer;
export default class App extends React.Component {


  constructor(props) {
    super(props)

    global.MyTrackPlayer.setupPlayer()
  }

  componentDidMount() {


  }

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={eva.dark}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Album" component={AlbumScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Audio" component={AudioScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="BundleSermon" component={BundleSermonScreen}
                options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen name="Sermon" component={SermonScreen}
                options={{ headerShown: false, animation: 'none' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
        </SafeAreaProvider>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  }
})