import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, HStack } from "@gluestack-ui/themed";
import { Pie, PolarChart } from "victory-native";
import PoppinsMedium from "../../../assets/fonts/Poppins/Poppins-Medium.ttf";
import PoppinsSemiBold from "../../../assets/fonts/Poppins/Poppins-SemiBold.ttf";

const PieChart = () => {
  const randomNumber = () => Math.floor(Math.random() * (50 - 25 + 1)) + 125;

  function generateRandomColor() {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff);
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, "0")}`;
  }

  const data = [
    {
      value: 10,
      color: 'green',
      label: "Completed",
    },
    {
      value: 30,
      color: 'grey',
      label: "Incomplete",
    },
    {
      value: 40,
      color: 'grey',
      label: "Incomplete",
    },
  ];

  return (
    <>
      <Box
        width="100%"
        height="40%"
        paddingHorizontal={5}
        paddingVertical={30}
        backgroundColor="white"
        
      >
        <Box
          elevation={10}
          borderRadius={5}
          paddingVertical={10}
          height="100%"
          width="100%"
          backgroundColor="white"
        >
          <Box width="100%" backgroundColor="white" height="70%">
            <PolarChart
              data={data}
              colorKey={"color"}
              valueKey={"value"}
              labelKey={"label"}
              
            >
              <Pie.Chart
                startAngle={0}
                innerRadius={20}
                
              >
                {() => {
                  return (
                    <>
                      <Pie.Slice 
                      animate={{
                        duration: 1000,
                        easing: "easeInOut", 
                      }}
                    //   antiAlias={true}
                    // end={10}
                    // invertClip={true}
                    
                      />
                    </>
                  );
                }}
              </Pie.Chart>
            </PolarChart>
          </Box>
          <Box
            width="100%"
            backgroundColor="white"
            height="30%"
            alignItems="flex-end"
          >
            {data.map((val, index) => {
              return (
                <HStack
                  key={index}
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="row"
                  gap={10}
                >
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      backgroundColor: val.color,
                    }}
                  />
                  <Text style={{ width: 80 }}>{val.label}</Text>
                </HStack>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PieChart;

const styles = StyleSheet.create({});
