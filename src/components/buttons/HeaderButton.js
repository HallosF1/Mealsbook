import React from 'react';
import { View, Text, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';

export default function CustomHeaderButton(props) {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'black' : Colors.primaryColor} />
    )
}
