import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Modal, ActivityIndicator} from 'react-native';
import codePush from 'react-native-code-push';

interface props {
  navigation: any;
}

const App: React.FC<props> = () => {
  const [progress, setProgress] = useState(false)


  const syncWithcodePush = (status: undefined) => {
    console.log('----->',status);
  };

  useEffect(() => {
    codePush.sync(
      {installMode: codePush.InstallMode.IMMEDIATE},
      syncWithcodePush,
      codePushStatusDidChange,
      codePushDownloadDidProgress,
      null,
    );
  }, []);

  const codePushStatusDidChange = (SyncStatus) => {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log("Checking for update.")
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log("Download packaging....")
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log("Awaiting user action....")
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log("Installing update")
        setProgress(false)
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log("codepush status up to date")
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log("update cancel by user")
        setProgress(false)
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log("Update installed and will be applied on restart.")
        setProgress(false)
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log("An unknown error occurred")
        setProgress(false)
        break;
    }
  }

  const codePushDownloadDidProgress = (progress) => {
    setProgress(progress)
  }

  const showProgressView = () => {
    return (
      <Modal
        visible={true}
        transparent
      >
        <View style={{flex: 1,backgroundColor: 'rgba(0,0,0,0.8)',justifyContent: 'center',alignItems: 'center'}}>
          <View style={{backgroundColor: 'white', borderRadius: 8, padding: 16}}>
            <Text>In Progress.......</Text>
            <View style={{ alignItems: 'center' }}>
              <Text style={{marginTop: 16}}>{`${(Number(progress?.receivedBytes)/1048576).toFixed(2)}MB/${(Number(progress?.totalBytes)/1048576).toFixed(2)}`}</Text>
              <ActivityIndicator style={{ marginVertical: 8 }} color={'blue'} />
              <Text>{((Number(progress?.receivedBytes) / Number(progress?.totalBytes)) * 100).toFixed(0)}%</Text>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:25, fontWeight: '900', color: 'black', marginVertical: 20}}>App</Text>
      <View style={{height: 100, width: 200, backgroundColor:'blue', borderRadius: 100, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize: 20, color: 'red', fontWeight: '700'}}>Darshan</Text>
        <Text style={{fontSize: 20, color: 'red', fontWeight: '700'}}>Lukhi</Text>
        {!!progress ? showProgressView() : null}
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
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};

export default codePush(CODE_PUSH_OPTIONS)(App);
