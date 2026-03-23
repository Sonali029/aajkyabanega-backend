import { DishFoodType, CuisineType } from './cuisineDishes';

export type FoodPreference = 'veg' | 'veg-egg' | 'all';

/**
 * Check if a dish's food type matches the family's food preference
 */
export const matchesFoodPreference = (
    dishFoodType: DishFoodType,
    familyPreference: FoodPreference
): boolean => {
    switch (familyPreference) {
        case 'veg':
            return dishFoodType === 'veg';
        case 'veg-egg':
            return dishFoodType === 'veg' || dishFoodType === 'egg';
        case 'all':
            return true;
        default:
            return true;
    }
};

/**
 * Check if a dish's cuisine matches the family's primary cuisine
 * For MVP: Show dishes that match primary cuisine OR are universal (Chinese, Italian, Continental)
 */
export const matchesCuisine = (
    dishCuisine: CuisineType,
    primaryCuisine?: CuisineType
): boolean => {
    // If no primary cuisine is set, show all dishes
    if (!primaryCuisine) return true;

    // Universal cuisines that should show for everyone
    const universalCuisines: CuisineType[] = ['chinese', 'italian', 'continental', 'street-food'];

    if (universalCuisines.includes(dishCuisine)) {
        return true;
    }

    // Match primary cuisine
    if (dishCuisine === primaryCuisine) {
        return true;
    }

    // Special case: Punjabi and North Indian are closely related
    if (
        (primaryCuisine === 'punjabi' && dishCuisine === 'north-indian') ||
        (primaryCuisine === 'north-indian' && dishCuisine === 'punjabi')
    ) {
        return true;
    }

    // Special case: Mughlai works well with North Indian/Punjabi
    if (
        dishCuisine === 'mughlai' &&
        (primaryCuisine === 'punjabi' || primaryCuisine === 'north-indian')
    ) {
        return true;
    }

    return false;
};

/**
 * Filter dishes by both food preference and cuisine
 */
export const filterDishes = <T extends { foodType: DishFoodType; cuisine: CuisineType }>(
    dishes: T[],
    familyPreference: FoodPreference,
    primaryCuisine?: CuisineType
): T[] => {
    return dishes.filter(dish =>
        matchesFoodPreference(dish.foodType, familyPreference) &&
        matchesCuisine(dish.cuisine, primaryCuisine)
    );
};
