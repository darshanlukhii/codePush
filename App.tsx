import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CodePush from 'react-native-code-push';

interface props {
  navigation: any;
}

const App: React.FC<props> = () => {
  const syncWithCodePush = (status: undefined) => {
    console.log('----->',status);
  };

  useEffect(() => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.IMMEDIATE},
      syncWithCodePush,
      null,
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:25, fontWeight: '900', color: 'black', marginVertical: 20}}>App</Text>
      <View style={{height: 100, width: 200, backgroundColor:'grey', borderRadius: 100, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize: 20, color: 'red', fontWeight: '700'}}>Darshan</Text>
        <Text style={{fontSize: 20, color: 'red', fontWeight: '700'}}>Lukhi</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink',
    justifyContent:'center'
  },
});

const CODE_PUSH_OPTIONS = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
};

export default CodePush(CODE_PUSH_OPTIONS)(App);
