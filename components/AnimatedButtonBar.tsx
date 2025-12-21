import { View, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Colors from '@/Colors';
import TabBarButton from './TabBarButton';
import FinancialsNavigation from "@/components/FinancialsNavigation";

type ButtonConfig = {
    label: string; // just the button label
};

type Props = {
    buttons: ButtonConfig[];
    activeIndex: number;
    onChange: (index: number) => void;
};

export default function AnimatedButtonBar({ buttons, activeIndex, onChange }: Props) {
    const [dimensions, setDimensions] = useState({ height: 20, width: 20 });
    const indicatorX = useSharedValue(0);

    const buttonWidth = dimensions.width / buttons.length;

    indicatorX.value = withSpring(buttonWidth * activeIndex, {
        damping: 70,
        stiffness: 500,
    });

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: indicatorX.value }],
    }));

    const onLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        });
    };

    return (
        <View onLayout={onLayout} style={styles.container}>
            {/* Sliding background */}
            <Animated.View
                style={[
                    styles.indicator,
                    animatedIndicatorStyle,
                    { width: buttonWidth - 18, height: dimensions.height - 10 },
                ]}
            />

            {buttons.map((btn, index) => (
                <FinancialsNavigation
                    key={btn.label}
                    label={btn.label}
                    isFocused={activeIndex === index}
                    onPress={() => onChange(index)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 5,
        backgroundColor: Colors.grey,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    indicator: {
        position: 'absolute',
        backgroundColor: '#c4c4c6',
        borderRadius: 20,
        marginHorizontal: 10,
    },
});
