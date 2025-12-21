import {PlatformPressable, Text} from "@react-navigation/elements";
import { Pressable, StyleSheet} from "react-native";
import {icon} from "@/constants/icon";
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {useEffect} from "react";


export default function TabBarButton(

    {

        onPress,
        onLongPress,
        isFocused,
        routeName,
        color,
        label
    }: {
    onPress: Function ;
    onLongPress:Function;
    isFocused:boolean;
    routeName:string;
    color:string;
    label:string;
})
{
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            {duration:350}
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0,1], [1, 1.2]);
        const top = interpolate(scale.value, [0,1] , [0, 9])

        return{
            transform: [{
                scale: scaleValue

            }],
            top : top
        }
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0,1], [1,0]);

        return {
            opacity: opacity
        }
    });

    return (

        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
        >
            <Animated.View style={animatedIconStyle}>
            {icon[routeName] ({
                color: isFocused ? "#222" : "#FFF",
            })}
            </Animated.View>
            <Animated.Text style={
                [{ color: isFocused ? "#673ab7" : "#FFF", fontSize: 10 },
                animatedTextStyle]}
            >{label}
            </Animated.Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    // tabBar: {
    //     position: 'absolute',
    //     bottom: 50,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     backgroundColor: '#fff',
    //     marginHorizontal: 80,
    //     paddingVertical: 15,
    //     borderRadius: 35,
    //     shadowColor: '#000',
    //     shadowOffset: { width: 0, height: 10 },
    //     shadowRadius: 10,
    //     shadowOpacity: 0.1
    // },
    tabBarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})