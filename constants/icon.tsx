import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from '@expo/vector-icons/Foundation';


export const icon = {
    index: (props: any) => (
        <AntDesign name="stock" size={22} {...props} />
    ),
    stockProfile: (props: any) => (
        <AntDesign name="profile" size={22} {...props} />
    ),
    stockMetrics: (props: any) => (
        <Foundation name="foundation" size={22}  {...props} />
    ),
};