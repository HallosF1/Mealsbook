import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../../data/data';
import CategoryCard from '../components/Cards/CategoryCard';
import HeaderButton from '../components/buttons/HeaderButton';

export default function CategoriesScreen(props) {


    const renderGridItem = (itemData) => {
        return (
            <CategoryCard title={itemData.item.title} onSelect={
                () => {props.navigation.navigate({routeName: 'CategoryMeals', params:{
                    categoryId: itemData.item.id
                }})}
            } 
            color={itemData.item.color}
            />
        )      
        }
    return (
        <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
    )
}

CategoriesScreen.navigationOptions = navData => {
    return {
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    grid: {
        flex: 1,
        margin: 15,
        height: 150,
    }
})