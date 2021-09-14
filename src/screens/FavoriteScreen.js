import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import MealList from '../components/Cards/MealList'
import HeaderButton from '../components/buttons/HeaderButton';
import MealsBookText from '../components/Cards/MealsbookText';

export default function FavoriteScreen(props) {
    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return (
        <View style={styles.content}>
            <MealsBookText>No favorite meals found. Start adding some!</MealsBookText>
        </View>
        );
    }

    return <MealList listData={favMeals} navigation={props.navigation}/>;
};

FavoriteScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Favorites',
    headerLeft: () => 
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' 
                  iconName='ios-menu'
                  onPress={() => {
                      navData.navigation.toggleDrawer()
                  }}   
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})