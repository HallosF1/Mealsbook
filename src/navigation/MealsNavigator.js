import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from "react-navigation-drawer";

import FiltersScreen from '../screens/FiltersScreen'
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoriteScreen';
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    }
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        headerTitle: 'Meal Categories'
    },
    CategoryMeals: {
        screen: CategoryMealScreen,
    },
    MealDetail: {
        screen: MealDetailScreen
    },

}, defaultStackNavOptions);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, defaultStackNavOptions)

const tabScreen = {
    Meals : {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />)
            },
            tabBarColor: Colors.primaryColor,
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: ' ',
            tabBarIcon: (tabInfo) => {
                return (<Ionicons name='bookmark-outline' size={25} color={tabInfo.tintColor} />)
            },
            tabBarColor: Colors.accentColor
        }
    }
}

const MealsFavTabNav = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreen, {
    activeColor: 'white',
    shifting: true
}) : createBottomTabNavigator(
    tabScreen
, {
    tabBarOptions: {
        labelStyle: {
            fontFamily: 'open-sans-bold'
        },
        activeTintColor: Colors.accentColor
    }
});

const FiltersNav = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNav,
        navigationOptions: {
            drawerLabel: 'Favorites'
        }
    },
    Filters: {
        screen: FiltersNav,
    }
}, {
    activeTintColor: Colors.accentColor,
    labelStyle: {
        fontFamily: 'open-sans'
    }
})

export default createAppContainer(MainNavigator);