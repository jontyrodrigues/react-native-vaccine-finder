import React from 'react';
import { Text,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { DetailsScreenComponent } from './components/detailscreen';
import { HomeScreenComponent } from './components/homescreen';


const Stack = createStackNavigator();

function DetailsScreen({route,navigation}) {
  const {session_data,slots} = route.params;
  return (
  <DetailsScreenComponent session_data={session_data} slots={slots}></DetailsScreenComponent>
  )
}


function HomeScreen({navigation}) {
  return(
  <HomeScreenComponent navigation = {navigation}> </HomeScreenComponent>
  )
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#3166eb',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};




export default App;