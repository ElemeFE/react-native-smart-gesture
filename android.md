```jsx
// good
<View>
  <SmartGesture onGesture={this._onGesture.bind(this)} height={300} onSwipe={this._onSwipe}/>
  <SmartGesture onGesture={this._onGesture2.bind(this)} lineColor={'#000'}>
    <Image source={{uri: 'https://placeimg.com/200/200/any'}} style={{width: 200,height:200,borderWidth:2}} />
  </SmartGesture>
</View>

// bad
<View>
  <SmartGesture onGesture={this._onGesture.bind(this)} height={300} onSwipe={this._onSwipe}/>
  <View>
    <SmartGesture onGesture={this._onGesture2.bind(this)} lineColor={'#000'}>
      <Image source={{uri: 'https://placeimg.com/200/200/any'}} style={{width: 200,height:200,borderWidth:2}} />
    </SmartGesture>
  <View>
</View>
```

`SmartGesture` 组件须放到根元素下。这是因为 Android 下 React Native 获取移动的触摸点坐标存在 bug，详情见这个 [issue](https://github.com/facebook/react-native/issues/7221)。
 所以 Android 下我们使用 `pageX` 和 `layout` 来计算触摸点的坐标。而 `layout` 的计算是基于父元素的，如果 `SmartGesture` 的父节点不是页面的根元素，会导致计算出触摸点坐标有误。
