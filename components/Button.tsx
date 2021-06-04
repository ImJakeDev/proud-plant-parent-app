import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  accessibilityLabel?: string;
  color?: string;
  disabled?: boolean;
  hasTVPreferredFocus?: boolean;
  nextFocusDown?: number;
  nextFocusForward?: number;
  nextFocusLeft?: number;
  nextFocusRight?: number;
  nextFocusUp?: number;
  testID?: string;
  touchSoundDisabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onPress, title } = props;
  return (
    <View style={{ paddingBottom: 20 }}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
