import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback, ImageBackground } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import MealsbookText from './MealsbookText';

export default function MealCard(props) {
    let TouchableCmp = TouchableOpacity;
    let affordability = <Ionicons name='cash-outline' size={18} color='green'/>
    let complexity = <Ionicons name='cellular' size={18} color='green'/>
    if(Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    if(props.affordability === 'pricey'){
        affordability = <Ionicons name='cash-outline' size={18} color='orange'/>
    }
    else if(props.affordability === 'luxurious'){
        affordability = <Ionicons name='cash-outline' size={18} color='red'/> 
    }

    if(props.complexity === 'hard'){
        complexity = <Ionicons name='cellular' size={18} color='orange'/>
    }
    else if(props.complexity === 'challenging'){
        complexity = <Ionicons name='cellular' size={18} color='red'/> 
    }

    return (
        <View style={styles.item}>
            <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
               <View>
                    <View style={{...styles.row, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.imageUrl}} style={styles.bgImage}>
                        <View style={styles.titleContainer}>
                        <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </View>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.row, ...styles.mealDetail}}>
                        <View style={styles.row}>
                            <MealsbookText>{props.duration}m</MealsbookText>
                            <Ionicons name='time-outline' size={18} /> 
                        </View>
                        <View style={styles.row}>
                            <MealsbookText style={{marginRight: 5}}>{props.complexity.toUpperCase()}</MealsbookText>
                            {complexity}
                        </View>
                        <View style={styles.row}>
                           <MealsbookText>{props.affordability.toUpperCase()}</MealsbookText>
                           {affordability}
                        </View>
                    </View>
               </View>
            </TouchableCmp>
        </View>
    )    
}

const styles = StyleSheet.create({
    item: {
        height: 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        overflow: 'hidden',
        marginVertical: 10
    },
    row: {
        flexDirection: 'row'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    mealHeader: {
        height: '85%',
    },
    bgImage:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    titleContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    time: {
        flexDirection: 'row'
    }
})