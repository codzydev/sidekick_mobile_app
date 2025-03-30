import { Stepper } from "@/components";
import { ThemedView } from "@/components/ThemedView";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, View } from "react-native";

const HomeScreen = () => {
  const steps = [
    "Job Details",
    "Address",
    "Contact",
    "Payment",
    "Review",
    "Done",
  ];
  const [currentStep, setCurrentStep] = useState(0);

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

  return <Redirect href="/task" />;

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stepper steps={steps} currentStep={currentStep} />
        <Link href="/task">Go to Tasks --------- </Link>
        <View style={{ paddingHorizontal: 16, marginTop: 20, gap: 10 }}>
          {!isLastStep && <Button title="Next" onPress={handleNext} />}
          {isLastStep && <Button title="Done" onPress={handleSubmit} />}
          {currentStep > 0 && <Button title="Previous" onPress={handlePrev} />}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
