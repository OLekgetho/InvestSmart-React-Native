import {View, Platform, StyleSheet, LayoutChangeEvent} from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import TabBarButton from "@/components/TabBarButton";
import {useState} from "react";
import {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {AnimatedView} from "react-native-reanimated/src/component/View";
import Colors from "@/Colors";

export function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const [dimensions, setDimensions] = useState({height: 20, width: 20 });

    const buttonWidth = dimensions.width / state.routes.length;

    const onTabbarLayout = (e:LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        });
    };

    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: tabPositionX.value}]
        }
    })

    return (
        <View onLayout={onTabbarLayout} style={styles.tabBar}>
            <AnimatedView style={[animatedStyle,{
                position: 'absolute',
                backgroundColor: '#c4c4c6',
                borderRadius: 30,
                marginHorizontal: 12,
                height: dimensions.height - 15,
                width: buttonWidth-  25
            }]} />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, {duration: 200})

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused = {isFocused}
                        routeName={route.name}
                        color={isFocused ? "#673ab7" : "#222"}
                        label={label}

                    />
                    // <PlatformPressable
                    //     key={route.name}
                    //     href={buildHref(route.name, route.params)}
                    //     accessibilityState={isFocused ? { selected: true } : {}}
                    //     accessibilityLabel={options.tabBarAccessibilityLabel}
                    //     testID={options.tabBarButtonTestID}
                    //     onPress={onPress}
                    //     onLongPress={onLongPress}
                    //     style={ styles.tabBarItem}
                    // >
                    //     {icon[route.name]({
                    //         color: isFocused ? "#673ab7" : "#222"
                    //     })}
                    //
                    //     <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
                    //         {label}
                    //     </Text>
                    // </PlatformPressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.grey,
        marginHorizontal: 70,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        borderColor: '#111',
        borderWidth: 1,
        borderTopWidth: 1,
        borderTopColor: '#111'

    },
    // tabBarItem: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     gap: 5
    // }
})