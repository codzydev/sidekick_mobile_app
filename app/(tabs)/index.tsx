import { Button, SafeAreaView, StyleSheet } from "react-native";

import Stepper from "@/components/stepper/stepper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";

const HomeScreen = () => {
  const backgroundColor = useThemeColor({}, "background");

  const steps = [
    "Start",
    "Details",
    "Done",
    "Donex",
    "Chana",
    "Moiney",
    "Akash",
    "Sam",
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor,
      }}
    >
      <Stepper steps={steps} currentStep={currentStep} />
      <Button
        title="Next"
        onPress={() =>
          setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
        }
      />
      <Button title="prev" onPress={handlePrev} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
