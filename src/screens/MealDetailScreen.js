import React, { useEffect, useCallback } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';

import HeaderButton from '../components/buttons/HeaderButton'
import MealsbookText from '../components/Cards/MealsbookText'
import { toggleFavorite } from '../../store/actions/meals'

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <MealsbookText>{props.children}</MealsbookText>
        </View>
    )
}

export default function MealDetailScreen(props) {
    const mealId = props.navigation.getParam('mealId')
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId))
    const avaibleMeals = useSelector(state => state.meals.meals)
    const selectedMeal = avaibleMeals.find(meal => meal.id === mealId)
    
    let affordability = <Ionicons name='cash-outline' size={18} color='green'/>
    let complexity = <Ionicons name='cellular' size={18} color='green'/>

    if(selectedMeal.affordability === 'pricey'){
        affordability = <Ionicons name='cash-outline' size={18} color='orange'/>
    }
    else if(selectedMeal.affordability === 'luxurious'){
        affordability = <Ionicons name='cash-outline' size={18} color='red'/> 
    }

    if(props.complexity === 'hard'){
        complexity = <Ionicons name='cellular' size={18} color='orange'/>
    }
    else if(props.complexity === 'challenging'){
        complexity = <Ionicons name='cellular' size={18} color='red'/> 
    }

    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId))
    }, [dispatch, mealId])

    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavorite})
    }, [currentMealIsFavorite])

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <View style={styles.row}>
                    <MealsbookText>{selectedMeal.duration}m</MealsbookText>
                    <Ionicons name='time-outline' size={18} />
                </View>
                <View style={styles.row}>
                    <MealsbookText style={{marginRight: 5}}>{selectedMeal.complexity.toUpperCase()}</MealsbookText>
                    {complexity}
                </View>
                <View style={styles.row}>
                    <MealsbookText>{selectedMeal.affordability.toUpperCase()}</MealsbookText>
                    {affordability}
                </View>  
            </View>
            <MealsbookText style={styles.title}>Ingredients</MealsbookText>
            {selectedMeal.ingredients.map(ingredient => <ListItem key={ingredient}>{ingredient}</ListItem>)}
            <MealsbookText style={styles.title}>Steps</MealsbookText>
            {selectedMeal.steps.map(step => <ListItem key={step}>{step}</ListItem>)}
        </ScrollView>
        
    )
}

MealDetailScreen.navigationOptions = (navigationData) => {
    
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');

    return{
        headerTitle: mealTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='favorite' iconName={isFav ? 'ios-star' : 'ios-star-outline'} onPress={toggleFav} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 30,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#fff',
        backgroundColor: '#68a0cf',
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 30
    },
    row: {
        flexDirection: 'row'
    }
})