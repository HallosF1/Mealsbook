import React, { useState, useEffect, useCallback } from 'react'
import { View, StyleSheet, Switch, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/buttons/HeaderButton';
import MealsbookText from '../components/Cards/MealsbookText';
import Colors from '../constants/Colors';
import { setFilters } from '../../store/actions/meals';

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <MealsbookText>{props.label}</MealsbookText>
            <Switch trackColor={{true: Colors.accentColor, false: Colors.primaryColor}} thumbColor={Platform.OS === 'android' ? Colors.accentColor : ''} value={props.state} onValueChange={props.onChange}/>
        </View>
    )
}

export default function FiltersScreen(props) {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegeterian
        }
        dispatch(setFilters(appliedFilters))
    }, [isGlutenFree, isLactoseFree, isVegan, isVegeterian, dispatch])

    useEffect(() => {
        navigation.setParams({save: saveFilters})
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <MealsbookText style={styles.title}>Avaible Filters / Restrictions</MealsbookText>
            <FilterSwitch state={isGlutenFree} label='Gluten-free' onChange={newValue => {setIsGlutenFree(newValue)}} />
            <FilterSwitch state={isLactoseFree} label='Lactose-free' onChange={newValue => {setIsLactoseFree(newValue)}}/>
            <FilterSwitch state={isVegan} label='Vegan' onChange={newValue => {setIsVegan(newValue)}}/>
            <FilterSwitch state={isVegeterian} label='Vegeterian' onChange={newValue => {setIsVegeterian(newValue)}}/>
        </View>
    )
}

FiltersScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Filters',
    headerLeft: () => 
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' 
                  iconName='ios-menu'
                  onPress={() => {
                      navData.navigation.toggleDrawer()
                  }}   
            />
        </HeaderButtons>,
    headerRight: () => 
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' 
                iconName='ios-save'
                onPress={navData.navigation.getParam('save')}  
            />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15
    }
})