import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

type Props = {
    onPress: () => void;
    isFocused: boolean;
    label: string;
};

export default function FinancialsNavigation({ onPress, isFocused, label }: Props) {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, {
            damping: 15,
            stiffness: 120,
        });
    }, [isFocused]);

    const animatedTextStyle = useAnimatedStyle(() => ({
        color: isFocused ? '#242424' : '#FFF',
    }));

    return (
        <Pressable onPress={onPress} style={styles.item}>
            <Animated.Text style={[styles.label, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
