import { ThemedView } from "@/components/common/ThemedView";
import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

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
      <Link href="/task">Go to Tasks --------- </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
