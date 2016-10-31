## 使用前添加依赖
> Android默认就包含ART库，IOS需要单独添加依赖库。

1. 右键点击项目 -> ‘Add Files to ProjectName -> 选择 根目录/node_modules/react-native/Libraries/ART/ART.xcodeproj’
2. 在 Xcode 中将文件 ART.xcodeproj/Products/libART.a 添加(拖动)到 Build Phases 菜单 下的 Linked Frameworks and Libraries

![Imgur](http://i.imgur.com/2dB4R0m.png)

## 使用方法
作为独立的组件使用，也可以作为父容器来使用：

```bash
npm install -S react-native-smart-gesture 
```

```jsx
import SmartGesture from 'react-native-smart-gesture';

render() {
  return (
    <View>
      <SmartGesture onGesture={this._onGesture.bind(this)} height={300} onSwipe={this._onSwipe.bind(this)}/>
      <SmartGesture onGesture={this._onGesture.bind(this)} lineColor={'#000'}>
        <Image source={{uri: 'https://placeimg.com/200/200/any'}} style={{width: 200,height:200,borderWidth:2}} />
      </SmartGesture>
    </View>
  );
}
```


## 说明
- android 上使用 `SmartGesture` , 必须把 `SmartGesture` 组件放在该页面的根元素内。[详细](./android.md)。
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

