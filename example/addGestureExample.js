import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import SmartGesture from 'react-native-smart-gesture';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      points: [],
      result: null,
      text: '',
    };
  }

  _onGesture(result, points) {
    this.setState({ result, points });
  }

  _onGesture2(result, points) {
    this.setState({ result, points });
  }

  _onSwipe(res) {
    // console.log(res);
  }

  _addGesture() {
    if (!this.state.text) return;
    const gesture = {
      name: this.state.text,
      points: this.state.points,
    };
    this.refs.g1.addGesture(gesture);
    this.refs.g2.addGesture(gesture);
    this.setState({text: ''});
  }

  render() {
    return (
      <View>
        <SmartGesture ref="g1" onGesture={this._onGesture.bind(this)} height={300} onSwipe={this._onSwipe}/>
        <SmartGesture ref="g2" onGesture={this._onGesture2.bind(this)} lineColor={'red'}>
          <Image
            source={{uri: 'https://placeimg.com/200/200/any'}}
            style={{width: 200,height:200,borderWidth:2,borderColor:'yellow'}}
          />
        </SmartGesture>

        <Text>
          结果: {JSON.stringify(this.state.result)}
        </Text>

        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <TextInput
            placeholder="描绘后输入手势名称"
            style={{flex: 2, height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <TouchableOpacity
            onPress={this._addGesture.bind(this)}
            style={{flex: 1, height: 40, borderWidth: 1, backgroundColor: '#337ab7'}}
          >
            <Text style={{color: '#fff',textAlign:'center',padding:10}}>添加手势</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


// index.ios.js
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
// import App from './Path/To/addGestureExample';
//
// export default class smartGestureRn extends Component {
//   render() {
//     return (
//       <App />
//     );
//   }
// }
//
// AppRegistry.registerComponent('AwesomeProject', () => smartGestureRn);
