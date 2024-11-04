import React from 'react';
import { View, Text } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const DoughnutChart = ({ data }) => {
  const outerRadius = 80;  // Outer radius of the doughnut
  const innerRadius = 25;    // Inner radius of the doughnut
  const total = data.reduce((sum, { value }) => sum + value, 0);
  let cumulativeValue = 0;

  return (
    <View style={{ alignItems: 'center' }}>
      <Svg height={outerRadius * 2} width={outerRadius * 2}>
        {data.map((slice, index) => {
          const { value, color } = slice;
          const startAngle = (cumulativeValue / total) * 2 * Math.PI;
          cumulativeValue += value;
          const endAngle = (cumulativeValue / total) * 2 * Math.PI;

          const x1 = outerRadius + outerRadius * Math.cos(startAngle);
          const y1 = outerRadius + outerRadius * Math.sin(startAngle);
          const x2 = outerRadius + outerRadius * Math.cos(endAngle);
          const y2 = outerRadius + outerRadius * Math.sin(endAngle);

          const x1Inner = outerRadius + innerRadius * Math.cos(startAngle);
          const y1Inner = outerRadius + innerRadius * Math.sin(startAngle);
          const x2Inner = outerRadius + innerRadius * Math.cos(endAngle);
          const y2Inner = outerRadius + innerRadius * Math.sin(endAngle);

          const largeArcFlag = value / total > 0.5 ? 1 : 0;

          const pathData = [
            `M ${x1} ${y1}`, // Move to outer arc start
            `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`, // Outer arc
            `L ${x2Inner} ${y2Inner}`, // Line to inner arc
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x1Inner} ${y1Inner}`, // Inner arc
            'Z', // Close the path
          ].join(' ');

          return (
            <G key={index}>
              <Path d={pathData} fill={color} />
            </G>
          );
        })}
      </Svg>
      {/* <Text style={{ position: 'absolute', fontSize: 24 }}>Total: {total}</Text> */}
    </View>
  );
};

export default DoughnutChart;
