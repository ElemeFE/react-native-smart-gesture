import React, { Component } from 'react';
import { View, StyleSheet, ART } from 'react-native';

const { Surface, Group, Shape, Path } = ART;

export default class LineTrace extends Component {

  static defaultProps = {
    pointList: [],
    stroke: '#000',
    strokeWidth: 3
  };

  static propTypes = {
    pointList: React.PropTypes.array.isRequired,
  };

  render() {
    const { pointList, style, stroke, strokeWidth, width, height} = this.props;
    let path = '';
    if (pointList.length >= 2) {
      path = Path().moveTo(pointList[0].x, pointList[0].y);
      pointList.forEach((val) => {
        path = path.lineTo(val.x, val.y);
      });
    }

    return (
      <Surface style={[styles.surface, style]} width={width} height={height}>
        <Shape
          d={path}
          stroke={this.props.lineColor || stroke}
          strokeWidth={this.props.lineWidth || strokeWidth}
        />
      </Surface>
    );
  }
}

var styles = StyleSheet.create({
  surface: {
    backgroundColor: 'transparent',
  },
});
