import { Colors } from "@/constants";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "../common/ThemedText";
import { IconSymbol } from "../ui/IconSymbol";

const { width } = Dimensions.get("window");

interface StepperProps {
  steps: string[];
  currentStep: number;
  titleEnabled?: boolean;
}

const CIRCLE_SIZE = 30;
const STEP_ITEM_WIDTH = 60;

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  titleEnabled = false,
}) => {
  const stepSpacing = width / steps.length;
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    progressWidth.value = withTiming(currentStep * stepSpacing, {
      duration: 400,
    });
  }, [currentStep]);

  const animatedLineStyle = useAnimatedStyle(() => ({
    width: progressWidth.value,
    height: 3,
    backgroundColor: Colors.success,
  }));

  const renderStep = (step: string, index: number) => {
    const isCompleted = index < currentStep;
    const isActive = index <= currentStep;

    // Animations
    const scale = useSharedValue(1);
    const fillScale = useSharedValue(isActive ? 1 : 0);
    const labelOpacity = useSharedValue(0);
    const labelTranslate = useSharedValue(6);

    useEffect(() => {
      if (isCompleted) {
        scale.value = withSpring(1.2, { damping: 5 });
        setTimeout(() => (scale.value = withSpring(1)), 300);
      }
      fillScale.value = withTiming(isActive ? 1 : 0, { duration: 300 });

      if (isActive) {
        labelOpacity.value = withTiming(1, { duration: 400 });
        labelTranslate.value = withTiming(0, { duration: 400 });
      }
    }, [isCompleted, isActive]);

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const animatedLabelStyle = useAnimatedStyle(() => ({
      opacity: labelOpacity.value,
      transform: [{ translateY: labelTranslate.value }],
    }));

    const animatedFillStyle = useAnimatedStyle(() => ({
      transform: [{ scale: fillScale.value }],
      opacity: fillScale.value,
    }));

    return (
      <View
        key={index}
        style={[
          styles.stepItem,
          {
            position: "absolute",
            left: index * stepSpacing + stepSpacing / 2 - STEP_ITEM_WIDTH / 2,
          },
        ]}
      >
        <View style={[styles.circleWrapper]}>
          <Animated.View style={[styles.circleFill, animatedFillStyle]} />
          {isCompleted ? (
            <Animated.View style={[animatedIconStyle, styles.iconContainer]}>
              <IconSymbol name="checkmark" size={16} color="white" />
            </Animated.View>
          ) : (
            <ThemedText style={styles.stepText} type="defaultSemiBold">
              {index + 1}
            </ThemedText>
          )}
        </View>
        {titleEnabled && (
          <Animated.Text style={[animatedLabelStyle]}>
            <ThemedText style={styles.stepLabel}>{step}</ThemedText>
          </Animated.Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {/* Progress Line */}
      <View
        style={[
          styles.progressLineContainer,
          {
            width: stepSpacing * (steps.length - 1),
            left: stepSpacing / 2,
          },
        ]}
      >
        <View style={styles.lineBackground} />
        <Animated.View style={[styles.lineForeground, animatedLineStyle]} />
      </View>

      {/* Steps */}
      <View style={[styles.stepsContainer, { width }]}>
        {steps.map(renderStep)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  progressLineContainer: {
    position: "absolute",
    top: CIRCLE_SIZE / 2,
    height: 3,
    zIndex: 0,
  },
  lineBackground: {
    backgroundColor: Colors.dark.card,
    height: 3,
    width: "100%",
    position: "absolute",
  },
  lineForeground: {
    height: 3,
    position: "absolute",
  },
  stepsContainer: {
    position: "relative",
  },
  stepItem: {
    alignItems: "center",
    width: STEP_ITEM_WIDTH,
  },
  circleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: Colors.dark.card,
  },
  circleFill: {
    position: "absolute",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: Colors.success,
  },
  iconContainer: {
    zIndex: 1,
  },
  stepText: {
    color: "#fff",
    zIndex: 1,
    fontSize: 12,
  },
  stepLabel: {
    marginTop: 4,
    fontSize: 10,
    textAlign: "center",
  },
});
