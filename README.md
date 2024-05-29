# react-native-nconsole

logger console for react native

## Getting Started

![Demo NConsole](https://github.com/nghinv-software/react-native-nconsole/blob/main/assets/demo_nconsole.png)

## Installation

App desktop download [NConsole](https://drive.google.com/drive/folders/1P4cqXhalzsiPtrVAKWvoD9tK_pt9ZpzJ?usp=share_link)

```sh
npm install react-native-nconsole
```

## Usage

```js
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
```

## License

MIT

---
