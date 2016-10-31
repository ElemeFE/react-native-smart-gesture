import React from 'react';
import { View, PanResponder, Dimensions, Platform } from 'react-native';
import LineTrace from './lib/line-trace';
import { Unistroke, DollarRecognizer } from './lib/dollarOne';
import * as initGestures from './lib/dollarOne/gestures';

const defaultConfig = {
  minRecognize: 10,             // The minimum for gesture recognizing
  addToPathThreshold: 5,        // The minimum move distance for add to path
  getDirectionThreshold: 20,    // The minimum move distance for recognizing the direction
  height: 400,                  // default height for drawing area
  bgColor: '#ccc',              // default background color for drawing area
};

const defaultProps = {
  active: true,                 // enable smart gesture
  enablePath: true,             // enable line path
  lineColor: '#666',
  lineWidth: 4,
};

const defaultStyle = {
  lineTrace: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  view: {
    position: 'relative',
    backgroundColor: defaultConfig.bgColor,
  },
};

class SmartGesture extends React.Component {
  constructor(props) {
    super(props);
    this.DR = new DollarRecognizer();
    this.directionList = [];
    this.Unistrokes = [];
    this.layoutX = 0;
    this.layoutY = 0;
    this.state = {
      active: props.active,
      height: 0,
      width: 0,
      points: [],
    };
  }

  componentWillMount() {
    this._initUnistrokes(this.props.gestures || initGestures);
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => () => this.state.active,
      onMoveShouldSetPanResponder: () => () => this.state.active,
      onPanResponderGrant: (e, gs) => this._handlePanResponderGrant(e.nativeEvent, gs),
      onPanResponderMove: (e, gs) => this._handlePanResponderMove(e.nativeEvent, gs),
      onPanResponderRelease: (e, gs) => this._handlePanResponderEnd(e.nativeEvent, gs),
    });
  }

  _initUnistrokes(gestures) {
    if (Array.isArray(gestures)) {
      gestures.forEach(ges => this.addGesture(ges));
    } else {
      Object.keys(gestures).forEach(key => this.addGesture(gestures[key]));
    }
  }

  _handlePanResponderGrant(e, gs) {
    if (!this.state.active) return;
    if (gs.numberActiveTouches > 1) return;

    const startPoint = { x: e.locationX, y: e.locationY };
    this.setState({ points: [startPoint] });
  }

  _handlePanResponderMove(e, gs) {
    if (!e.touches) return;

    // hack
    let x = this.state.points[0].x;
    let y = this.state.points[0].y;
    if (Platform.OS === 'ios') {
      x = e.locationX;
      y = e.locationY;
    } else {
      x = e.pageX - this.layoutX;
      y = e.pageY - this.layoutY;
    }

    const { dx, dy } = gs;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const { addToPathThreshold, getDirectionThreshold } = defaultConfig;

    if (absDx > addToPathThreshold || absDy > addToPathThreshold) {
      this.setState({ points: this.state.points.concat({x, y}) });
    }
    if (absDx > getDirectionThreshold || absDy > getDirectionThreshold) {
      let d;
      // todo: deal case (absDx === absDy)
      if (absDx >= absDy) {
        d = dx > 0 ? 'RIGHT' : 'LEFT';
      } else {
        d = dy > 0 ? 'DOWN' : 'UP';
      }

      const lastDirection
        = this.directionList.length <= 0
        ? ''
        : this.directionList[this.directionList.length - 1];
      if (d !== lastDirection) this.directionList.push(d);
    }
  }

  _handlePanResponderEnd() {
    const { points } = this.state;

    if (this.directionList.length && this.props.onSwipe) {
      this.props.onSwipe(this.directionList);
    }
    if (points.length > defaultConfig.minRecognize && this.props.onGesture) {
      const res = this.DR.recognize(points, this.Unistrokes, true);
      this.props.onGesture(res, points);
    }
    if (this.props.enablePath) {
      this.setState({
        points: [],
      });
      this.directionList.length = 0;
    }
  }

  _onLayout(event) {
    const { width, height, x, y } = event.nativeEvent.layout;

    if (
      width !== this.state.width
      || height !== this.state.height
      || x !== this.layoutX
      || y !== this.layoutY
    ) {
      this.layoutX = x;
      this.layoutY = y;
      this.setState({ width, height });
    }
  }

  addGesture(ges = {}) {
    const { name, points } = ges;
    if (!name || !points || !Array.isArray(points)) {
      console.log('invalid params. addGesture fail.');
      return false;
    }

    const unistroke = new Unistroke(name, points);
    this.Unistrokes.push(unistroke);
    return unistroke;
  }

  setActive(active = true) {
    this.setState({ active });
  }

  render() {
    const panResponderHandlers
      = this.state.active
      ? this._panResponder.panHandlers
      : {};
    const { lineColor, lineWidth } = this.props;

    if (this.props.children) {
      return (
        <View
          {...panResponderHandlers}
          onLayout={event => this._onLayout(event)}
          style={{position:'relative',borderWidth: 1}}
          {...this.props}
        >
          {this.props.children}
          {
            this.props.enablePath ?
              <LineTrace
                lineColor={lineColor}
                lineWidth={lineWidth}
                pointList={this.state.points}
                width={this.state.width || 1}
                height={this.state.height || 1}
                style={{...defaultStyle.lineTrace}}
              /> : null
          }
        </View>
      );
    }

    return (
      <View
        {...panResponderHandlers}
        onLayout={event => this._onLayout(event)}
        style={{...defaultStyle.view}}
        height={defaultConfig.height}
        {...this.props}
      >
        {
          this.props.enablePath ?
            <LineTrace
              lineColor={lineColor}
              lineWidth={lineWidth}
              pointList={this.state.points}
              width={this.state.width || 1}
              height={this.state.height || 1}
              style={{...defaultStyle.lineTrace}}
            /> : null
        }
      </View>
    );

  }
}

SmartGesture.propTypes = {
  lineColor: React.PropTypes.string,
  lineWidth: React.PropTypes.number,
  enablePath: React.PropTypes.bool,
  gestures: React.PropTypes.array,
  onSwipe: React.PropTypes.func,
  onGesture: React.PropTypes.func,
};

SmartGesture.defaultProps = defaultProps;

export default SmartGesture;
