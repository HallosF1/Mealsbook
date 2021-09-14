import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import MealCard from './MealCard'

export default function MealList(props) {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals);
    const renderMealItem = itemData => {
        const isFav = favoriteMeals.find(meal => meal.id === itemData.item.id)
        return (
            <MealCard onSelect={
                () => {props.navigation.navigate({routeName: 'MealDetail', params:{
                    mealId: itemData.item.id,
                    mealTitle: itemData.item.title,
                    isFav: isFav
                }})
            }} 
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            duration={itemData.item.duration}
            affordability={itemData.item.affordability}
            complexity={itemData.item.complexity}
            />
        )
    }
    return (
        <View style={styles.list}>
            <FlatList data={props.listData} renderItem={renderMealItem} style={{width: '100%'}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})