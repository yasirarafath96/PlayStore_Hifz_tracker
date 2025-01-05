import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Box, Button, ButtonText } from "@gluestack-ui/themed";
import { Bar, CartesianChart, useChartPressState } from "victory-native";
import { LinearGradient, useFont, vec, Text as SKText } from "@shopify/react-native-skia";
import inter from "../../../assets/fonts/Poppins/Poppins-Bold.ttf";
import { useDerivedValue } from "react-native-reanimated";
import { Circle } from "react-native-svg";

const DATA = function (length = 10) {
  return Array.from({ length }, (_, index) => ({
    month: index + 1,
    listenCount: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  }));
};

const BarChart = () => {
  const [data, setData] = useState([
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 1 },
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 2 },
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 3 },
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 4 },
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 5 },
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 6 },
    { listenCount: Math.floor(Math.random() * 30) + 1, month: 7 },
  ]);
  const font = useFont(inter, 10);
  const toolTipFont = useFont(inter, 5);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { listenCount: 0 },
  });

  const value = useDerivedValue(() => {
    return "$" + state.y.listenCount.value.value;
  }, [state]);
  const textYposition = useDerivedValue(() => {
    return state.y.listenCount.position.value - 10;
  }, [state]);
  const textXposition = useDerivedValue(() => {
    if(!font){
        return 0;
    }
    return (
        state.x.position.value -
      toolTipFont.measureText(value.value).width / 2
    );
  }, [state, toolTipFont]);

  useEffect(() => {}, []);

  console.log(data);
  return (
    <>
      <Box flex={1} width="100%" backgroundColor="white" paddingHorizontal={5}>
        <Box
          paddingTop={10}
          paddingHorizontal={10}
          height="80%"
          width="100%"
          backgroundColor="white"
        >
          <CartesianChart
            data={data}
            chartPressState={state}
            xKey="month"
            yKeys={["listenCount"]}
            padding={5}
            domain={{ y: [0, 100] }}
            domainPadding={{ left: 50, right: 50, top: 30 }}
            axisOptions={{
              font,
              tickCount: 7,
              labelColor: "black",
              lineColor: "black",
              formatXLabel: (value) => {
                const date = new Date(2024, value - 1);
                return date.toLocaleString("default", { month: "short" });
              },
            }}
          >
            {({ points, chartBounds }) => {
              if (!points || !chartBounds) return null;
              return (
                <>
                  <Bar
                    points={points.listenCount}
                    chartBounds={chartBounds}
                    animate={{ type: "timing", duration: 1000 }}
                    roundedCorners={{
                      topRight: 10,
                      topLeft: 10,
                    }}
                  >
                    <LinearGradient
                      start={vec(0, 0)}
                      end={vec(0, 900)}
                      colors={["green", "lightgrey"]}
                    />
                  </Bar>
                  {isActive ?
                    <>
                        <SKText
                            font={toolTipFont}
                            color={"black"}
                            x={textXposition}
                            y={textYposition}
                            text={value}
                        />
                        <Circle 
                            cx={state.x.position}
                            cy={state.y.listenCount.position}
                            r={8}
                            color={'grey'}
                            opacity={0.8}
                        />
                    </>
                  : null}
                </>
              );
            }}
          </CartesianChart>
        </Box>
      </Box>
      {/* <Box paddingTop={30} width="95%" height="10%" alignItems="center">
        <Button style={{ backgroundColor: "blue", padding: 10 }}>
          <ButtonText style={{ color: "white" }}>Update Text</ButtonText>
        </Button>
      </Box> */}
    </>
  );
};

export default BarChart;

const styles = StyleSheet.create({});
