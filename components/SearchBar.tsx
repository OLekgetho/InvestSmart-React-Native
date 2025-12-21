import {View, Text, TextInput, Keyboard} from "react-native";
import React, {useState} from 'react';
import Feather from '@expo/vector-icons/Feather';

interface Props {
    placeholder: string;
    onSubmit: (text: string) => void;
}

const SearchBar = ({placeholder, onSubmit} : Props) => {
    const [userName, setUserName] = useState('');
    const handleSubmit = () => {
        if (userName.trim() === '') return;
        onSubmit(userName.trim().toUpperCase());
        Keyboard.dismiss();
    }

    return (
        <View className="flex-row items-center bg-gray-600 rounded-3xl px-5 py-1">
            <Feather name="search" size={15} color="white" />
            <TextInput
                placeholder={placeholder}
                autoCapitalize="characters"
                value={userName}
                onChangeText={setUserName}
                onSubmitEditing={handleSubmit}
                placeholderTextColor="#ffffff"
                className="flex-1 ml-2 text-white"
            />
        </View>
    )
}

export default SearchBar;