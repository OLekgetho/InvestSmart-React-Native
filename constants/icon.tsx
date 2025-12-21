import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export const icon = {
    index: (props: any) => (
        <AntDesign name="stock" size={22} {...props} />
    ),
    stockProfile: (props: any) => (
        <MaterialIcons name="business" size={22} {...props} />
    ),
    stockWatchList: (props: any) => (
        <AntDesign name="alert" size={22} {...props} />
    ),
};