import React from 'react'
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import { CATEGORIES } from '../../data/data'
import MealList from '../components/Cards/MealList';
import { MealsBookText } from '../components/Cards/MealsbookText';

export default function CategoryMealScreen(props) {
    

    const categoryId = props.navigation.getParam('categoryId');

    const avaiableMeals = useSelector(state => state.meals.filteredMeals)

    const displayedMeals = avaiableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0)

    if (displayedMeals === 0) {
        <View style={styles.content}>
            <MealsBookText>No meals found, maybe check your filters ?</MealsBookText>
        </View>
    }

    return (
        <MealList listData={displayedMeals} navigation={props.navigation} />
    )
}
CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCat = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCat.title,
    };
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})