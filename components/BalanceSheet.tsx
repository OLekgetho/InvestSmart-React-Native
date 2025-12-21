import {FlatList, StyleSheet, Text, View} from 'react-native';
import Colors from "@/Colors";

type BalanceSheetItem = {
    key: string;
    label: string;
    value: number;
    unit: string;
};

export default function BalanceSheet({ data }: { data: BalanceSheetItem[] }) {

    return (

        <View>
            <Text className="text-white text-2xl font-light border-b border-b-[#898989]">
                Balance Sheet
            </Text>

            <FlatList
                data={data}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.value}>
                            {formatCurrency(item.value, item.unit)}
                        </Text>
                    </View>
                )}
            />
        </View>

        // <View>
        //     <Text className="text-white text-2xl font-light border-b border-b-[#898989]">Balance Sheet</Text>
        //     <View style={styles.container}>
        //         <Text style={styles.title}>Assets: </Text>
        //         <Text style={styles.info}>3739920</Text>
        //     </View>
        //     <View style={styles.container}>
        //         <Text style={styles.title}>Assets: </Text>
        //         <Text style={styles.info}>3739920</Text>
        //     </View>
        // </View>
    );
}

const formatCurrency = (value: number, unit: string) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: unit,
        maximumFractionDigits: 0,
    }).format(value);

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    label: {
        fontSize: 16,
        color: "#ffffff",
    },
    value: {
        fontSize: 15,
        color: "#eae7e7",
    },
});


// const styles = StyleSheet.create(
//     {
//         container: {
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginTop: 18,
//
//
//         },
//         title: {
//             fontSize: 17,
//             fontWeight: 'bold',
//             color: "#ffffff",
//         },
//         info: {
//             fontSize: 15,
//             color: "#eae7e7",
//             paddingHorizontal: 30
//         }
// });
