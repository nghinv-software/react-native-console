import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { NConsole } from 'react-native-nconsole';

export default function App() {
  React.useEffect(() => {
    NConsole.isEnable = true;
    NConsole.setUri('10.10.51.97');
  }, []);

  const onLog = () => {
    NConsole.log('Hello', 'World', { number: 1 });
    NConsole.group('Group', { number: 1 });
    NConsole.groupEnd();
  };

  return (
    <View style={styles.container}>
      <Button onPress={onLog} title="Log" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
