import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    onClose: () => void;
};

export default function IndexAISummary({ onClose }: Props) {
    return (
        <View style={styles.modalOverlay}>
            <SafeAreaView edges={[]} style={styles.modalView}>
                <View style={styles.topRow}>
                    <Text style={styles.modalText}>AI Summary</Text>
                    <Pressable onPress={onClose}>
                        <EvilIcons name="close" size={22} />
                    </Pressable>
                </View>
                <View>
                    <Text style={styles.modalTexts}>This is where the Index summary will be and depending on it it will increase the form</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}


const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    modalView: {
        flex: 1,
        position: 'absolute',
        height: 'auto',
        width: '100%',
        backgroundColor: 'white',
        padding: 29,

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,

    },


    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },

    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    },

    modalText: {
        marginBottom: 15,
        fontSize: 18,
        fontWeight: "700",
    },
    modalTexts: {
        fontSize: 13,
        fontWeight: 'light'
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});