import { Stepper } from "@/components";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

const TaskWrapper = () => {
  const steps = [
    "Job Details",
    "Address",
    "Contact",
    "Payment",
    "Review",
    "Done",
  ];
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleSubmit = () => {
    console.log("Form submitted!");
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };
  const isLastStep = currentStep === steps.length - 1;
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Stepper steps={steps} currentStep={currentStep} />
      <View style={{ paddingHorizontal: 16, marginTop: 20, gap: 10 }}>
        {!isLastStep && <Button title="Next" onPress={handleNext} />}
        {isLastStep && <Button title="Done" onPress={handleSubmit} />}
        {currentStep > 0 && <Button title="Previous" onPress={handlePrev} />}
      </View>
    </View>
  );
};

export default TaskWrapper;

const styles = StyleSheet.create({});
