# react-native-smart-gesture
This realization of [smart-gesture](https://github.com/ElemeFE/smart-gesture) for React Native。

## 添加依赖
> Android默认就包含ART库，IOS需要单独添加依赖库。

[操作步骤](./doc/dependency.md)

## 安装
```bash
npm install -S react-native-smart-gesture
```

## 使用方法
作为独立的组件使用，也可以作为父容器来使用：
```jsx
// index.ios.js

import React from 'react';
import { AppRegistry, View, Text } from 'react-native';
import SmartGesture from 'react-native-smart-gesture';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: null,
    };
  }

  _onGesture(result) {
    this.setState({ result });
  }

  render() {
    return (
      <View>
        <SmartGesture onGesture={this._onGesture.bind(this)} />
        <Text>{JSON.stringify(this.state.result)}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => App);
```

[更多示例](./example)

## 说明
- android 上使用 `SmartGesture` , 必须把 `SmartGesture` 组件放在该页面的根元素内。[详细](./doc/android.md)。
- `SmartGesture` 组件默认宽度为父组件的宽度。

## props
属性的说明请参考：[smart-gesture](https://github.com/ElemeFE/smart-gesture#configuration)

name       | type     | default
-----------|----------|----
enablePath | Boolean  | true
lineColor  | String   | #666
lineWidth  | Number   | 4
gestures   | Array    | -
onSwipe    | Function | -
onGesture  | Function | -

## Contribution

请在提交 PR 前阅读我们的[贡献指南](./.github/CONTRIBUTING_zh-cn.md)

## License

MIT
