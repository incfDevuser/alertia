import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = ()=>{
  return(
    <ScrollView>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Hello World</Text>
        <Text style={{fontSize: 16, color: 'gray'}}>This is a simple React Native app.</Text>
      </View>
    </ScrollView>
  )
}

export default App;
