export type MealSlotType = 'breakfast' | 'lunch' | 'dinner';
export type DishFoodType = 'veg' | 'egg' | 'non-veg';

export type CuisineType =
    | 'punjabi'
    | 'south-indian'
    | 'north-indian'
    | 'chinese'
    | 'italian'
    | 'continental'
    | 'street-food'
    | 'bengali'
    | 'gujarati'
    | 'maharashtrian'
    | 'hyderabadi'
    | 'kashmiri'
    | 'rajasthani'
    | 'mughlai'
    | 'kerala'
    | 'karnataka'
    | 'goan';

export interface CuisineDish {
    name: string;
    mealSlots: MealSlotType[];
    foodType: DishFoodType;
    imageUrl?: string;
}

/**
 * CUISINE-BASED DISH STORAGE
 * Organized by cuisine type for better filtering and scalability
 * Each cuisine contains ~30 dishes across breakfast, lunch, dinner
 */
export const CUISINE_DISHES: Record<CuisineType, CuisineDish[]> = {
    // ========================================
    // CHINESE CUISINE (~30 dishes)
    // ========================================
    'chinese': [
        // Breakfast
        { name: 'Veg Fried Rice', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Veg Noodles', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Veg Momos', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Spring Rolls', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Egg Fried Rice', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Egg Noodles', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Chicken Fried Rice', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Chicken Momos', mealSlots: ['breakfast'], foodType: 'non-veg' },

        // Lunch
        { name: 'Veg Manchurian', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Hakka Noodles', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Chowmein', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Schezwan Fried Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Spring Rolls', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Paneer Chilli', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Egg Chowmein', mealSlots: ['lunch'], foodType: 'egg' },
        { name: 'Chicken Manchurian', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Chilli', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Hakka Noodles', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner
        { name: 'Veg Fried Rice', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Hakka Noodles', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Manchurian', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Schezwan Noodles', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Hot & Sour Soup', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Egg Fried Rice', mealSlots: ['dinner'], foodType: 'egg' },
        { name: 'Chilli Chicken', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Fried Rice', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Chowmein', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Prawns Fried Rice', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // PUNJABI CUISINE (~30 dishes)
    // ========================================
    'punjabi': [
        // Breakfast
        { name: 'Aloo Paratha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Gobi Paratha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Paneer Paratha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Methi Paratha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Chole Bhature', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Amritsari Kulcha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Puri Bhaji', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch
        { name: 'Rajma Chawal', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dal Makhani', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kadhi Pakora', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sarson Ka Saag & Makki Roti', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Baingan Bharta', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Aloo Gobi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chole Masala', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Pindi Chole', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner
        { name: 'Paneer Tikka Masala', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Paneer Bhurji', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dal Bukhara', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pindi Chole', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Soya Chaap Masala', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Malai Kofta', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Butter Chicken', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Tikka Masala', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mutton Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Fish Amritsari', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // SOUTH INDIAN CUISINE (~30 dishes)
    // ========================================
    'south-indian': [
        // Breakfast
        { name: 'Idli Sambar', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Masala Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Plain Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Medu Vada', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Uttapam', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Rava Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pongal', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pesarattu', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch
        { name: 'Sambar Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Rasam Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Curd Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Lemon Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Tamarind Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bisi Bele Bath', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Pulao', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Avial', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner
        { name: 'Masala Dosa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Idli Sambar', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Uttapam', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pongal', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Rava Idli', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Medu Vada', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Fish Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Chettinad', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Prawn Masala', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Egg Curry', mealSlots: ['dinner'], foodType: 'egg' },
    ],

    // ========================================
    // NORTH INDIAN CUISINE (~30 dishes)
    // ========================================
    'north-indian': [
        // Breakfast
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Aloo Puri', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Bread Pakora', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Besan Chilla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Moong Dal Chilla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Samosa', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch
        { name: 'Kadai Paneer', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Matar Paneer', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Palak Paneer', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bhindi Masala', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chana Masala', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Jeera Rice & Dal Tadka', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Mix Veg', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Lauki Ki Sabji', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Tinda Masala', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Arbi Masala', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kathal', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chicken Curry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Egg Curry', mealSlots: ['lunch'], foodType: 'egg' },

        // Dinner
        { name: 'Palak Paneer', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Mushroom Do Pyaza', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Aloo Gobi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Kadai Paneer', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Mutton Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Egg Curry', mealSlots: ['dinner'], foodType: 'egg' },
    ],

    // ========================================
    // ITALIAN CUISINE (~20 dishes)
    // ========================================
    'italian': [
        // Breakfast
        { name: 'Pasta', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Macaroni', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Cheese Toast', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch
        { name: 'Pasta Alfredo', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Penne Arrabbiata', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Margherita Pizza', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Pizza', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Lasagna', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Spaghetti', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chicken Pizza', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner
        { name: 'Pasta Primavera', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pizza Margherita', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Penne Pasta', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Ravioli', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Risotto', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Carbonara', mealSlots: ['dinner'], foodType: 'egg' },
        { name: 'Chicken Alfredo', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Pepperoni Pizza', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // CONTINENTAL CUISINE (~15 dishes)
    // ========================================
    'continental': [
        // Breakfast
        { name: 'Sandwich', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Toast', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pancakes', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Omelette', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Scrambled Eggs', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Boiled Eggs', mealSlots: ['breakfast'], foodType: 'egg' },

        // Lunch
        { name: 'Grilled Sandwich', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'French Fries', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Mashed Potatoes', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner
        { name: 'Grilled Vegetables', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Soup', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Grilled Chicken', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Fish & Chips', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Steak', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // MUGHLAI CUISINE (~45 dishes)
    // ========================================
    'mughlai': [
        // Breakfast (15 dishes)
        { name: 'Shahi Tukda', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Khoya Paratha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Nahari', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Paya', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Kheema Pav', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Mutton Korma', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Sheer Korma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Haleem', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Chicken Korma', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Keema Paratha', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Shahi Paneer Paratha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Mughlai Paratha', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Baida Roti', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Paneer Korma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Khichdi', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch (15 dishes)
        { name: 'Chicken Biryani', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mutton Biryani', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Veg Biryani', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Nahari', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Rogan Josh', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Keema Matar', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Korma', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mutton Korma', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Shahi Paneer', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Paneer Korma', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Malai Kofta', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dal Bukhara', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Nargisi Kofta', mealSlots: ['lunch'], foodType: 'egg' },
        { name: 'Shahi Korma', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Achari Chicken', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Butter Chicken', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Biryani', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mutton Biryani', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Rogan Josh', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Keema Matar', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Korma', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mutton Korma', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Shahi Paneer', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Malai Kofta', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dal Bukhara', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Paneer Korma', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Haleem', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Rezala', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Veg Biryani', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Shahi Tukda', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // HYDERABADI CUISINE (~45 dishes)
    // ========================================
    'hyderabadi': [
        // Breakfast (15 dishes)
        { name: 'Hyderabadi Haleem', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Nihari', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Paya', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Keema Dosa', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Egg Dosa', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Pesarattu', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Idli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kheema Pav', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Bun Omelette', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Masala Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Rava Idli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Uttapam', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Vada', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Chicken Keema', mealSlots: ['breakfast'], foodType: 'non-veg' },

        // Lunch (15 dishes)
        { name: 'Hyderabadi Biryani', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Veg Biryani', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chicken Biryani', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mutton Biryani', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mirchi ka Salan', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bagara Baingan', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dalcha', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Khatti Dal', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chicken 65', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mutton Dalcha', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Haleem', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Paneer Biryani', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Egg Biryani', mealSlots: ['lunch'], foodType: 'egg' },
        { name: 'Fish Pulusu', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Gongura Chicken', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Hyderabadi Biryani', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Biryani', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mutton Biryani', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Veg Biryani', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Mirchi ka Salan', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bagara Baingan', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Chicken 65', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Haleem', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Dalcha', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Nihari', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Paya', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Egg Biryani', mealSlots: ['dinner'], foodType: 'egg' },
        { name: 'Paneer Biryani', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Double Ka Meetha', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Mutton Dalcha', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // STREET FOOD CUISINE (~45 dishes)
    // ========================================
    'street-food': [
        // Breakfast (15 dishes)
        { name: 'Vada Pav', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pav Bhaji', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Samosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kachori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Jalebi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dhokla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Khandvi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Misal Pav', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dabeli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Bread Pakora', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Aloo Tikki', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Egg Roll', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Chicken Roll', mealSlots: ['breakfast'], foodType: 'non-veg' },

        // Lunch (15 dishes)
        { name: 'Pani Puri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bhel Puri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dahi Puri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sev Puri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Ragda Pattice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Pav Bhaji', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Vada Pav', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chole Kulche', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Aloo Tikki Chaat', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Papdi Chaat', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Samosa Chaat', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kachori Chaat', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Egg Bhurji Pav', mealSlots: ['lunch'], foodType: 'egg' },
        { name: 'Chicken Tikka Roll', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Seekh Kebab Roll', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Vada Pav', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pav Bhaji', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Misal Pav', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Chole Bhature', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pani Puri', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bhel Puri', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Ragda Pattice', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dahi Puri', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Samosa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Kachori', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Aloo Tikki', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dabeli', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Egg Roll', mealSlots: ['dinner'], foodType: 'egg' },
        { name: 'Chicken Roll', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Seekh Kebab', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // BENGALI CUISINE (~45 dishes)
    // ========================================
    'bengali': [
        // Breakfast (15 dishes)
        { name: 'Luchi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Alur Dom', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Cholar Dal', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kochuri', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Radhaballabhi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Ghugni', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pitha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Jhal Muri', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dimer Jhol', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Egg Curry', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Fish Fry', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Machher Jhol', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Chicken Kosha', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Mutton Kosha', mealSlots: ['breakfast'], foodType: 'non-veg' },

        // Lunch (15 dishes)
        { name: 'Machher Jhol', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Shorshe Ilish', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chingri Malai Curry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Kosha Mangsho', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Kosha', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Fish Fry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Doi Maach', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Shukto', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Aloo Posto', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Cholar Dal', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dhokar Dalna', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Begun Bhaja', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dimer Dalna', mealSlots: ['lunch'], foodType: 'egg' },
        { name: 'Alu Bhaja', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Palong Shak', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner (15 dishes)
        { name: 'Machher Jhol', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Kosha Mangsho', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Kosha', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chingri Malai Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Shorshe Ilish', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Fish Fry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Doi Maach', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Shukto', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Aloo Posto', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Cholar Dal', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dhokar Dalna', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dimer Dalna', mealSlots: ['dinner'], foodType: 'egg' },
        { name: 'Luchi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Palong Shak', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Mishti Doi', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // GUJARATI CUISINE (~45 dishes)
    // ========================================
    'gujarati': [
        // Breakfast (15 dishes)
        { name: 'Dhokla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Khandvi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Fafda', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Thepla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Khakhra', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Handvo', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Patra', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Methi Thepla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Sev Khamani', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dhokli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Khaman', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dabeli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Jalebi Fafda', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch (15 dishes)
        { name: 'Gujarati Thali', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Undhiyu', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kadhi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dal Dhokli', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sev Tamatar', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Ringan Batata', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bhindi Sambhariya', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Aloo Matar', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sev Khamani', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Methi Thepla', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Handvo', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Khandvi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Patra', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Tuvar Dal', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Khichdi', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner (15 dishes)
        { name: 'Gujarati Thali', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Undhiyu', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Kadhi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dal Dhokli', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dhokla', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Khandvi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Thepla', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Handvo', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Patra', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Sev Tamatar', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Ringan Batata', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Khichdi Kadhi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bhakri', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Shrikhand', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Mohanthal', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // MAHARASHTRIAN CUISINE (~45 dishes)
    // ========================================
    'maharashtrian': [
        // Breakfast (15 dishes)
        { name: 'Misal Pav', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Sabudana Khichdi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Thalipeeth', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kanda Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Batata Vada', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Vada Pav', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Sabudana Vada', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kothimbir Vadi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Sheera', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Shrikhand', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Puri Bhaji', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Bharli Vangi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Egg Bhurji Pav', mealSlots: ['breakfast'], foodType: 'egg' },

        // Lunch (15 dishes)
        { name: 'Varan Bhaat', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Aamti', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Zunka Bhakri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bharli Vangi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bharlele Karle', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Masale Bhaat', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Kolhapuri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Batata Rassa', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Usal Pav', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Misal Pav', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kothimbir Vadi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Thalipeeth', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kombdi Vade', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Kolhapuri', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mutton Kolhapuri', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Vada Pav', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Misal Pav', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pav Bhaji', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Varan Bhaat', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bharli Vangi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Zunka Bhakri', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Aamti', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Masale Bhaat', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Usal Pav', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Thalipeeth', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Batata Rassa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Puran Poli', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Chicken Kolhapuri', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mutton Kolhapuri', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Kombdi Vade', mealSlots: ['dinner'], foodType: 'non-veg' },
    ],

    // ========================================
    // KASHMIRI CUISINE (~45 dishes)
    // ========================================
    'kashmiri': [
        // Breakfast (15 dishes)
        { name: 'Kahwa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Noon Chai', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Sheermal', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Bakarkhani', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Nadru Yakhni', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kashmiri Pulao', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kashmiri Saag', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dum Aloo Kashmiri', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Nadru Monje', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Chot', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Harissa', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Mutton Yakhni', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Tabak Maaz', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Matschgand', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Kashmiri Kebab', mealSlots: ['breakfast'], foodType: 'non-veg' },

        // Lunch (15 dishes)
        { name: 'Rogan Josh', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Yakhni', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Gushtaba', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Tabak Maaz', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Aab Gosht', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Methi Maaz', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Kashmiri Pulao', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Dum Aloo', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Nadru Yakhni', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Haak', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kashmiri Saag', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Rajma Gogji', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chaman', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Nadru Monje', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Al Yakhni', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner (15 dishes)
        { name: 'Rogan Josh', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Gushtaba', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Yakhni', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Tabak Maaz', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Aab Gosht', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Methi Maaz', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Kashmiri Pulao', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dum Aloo', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Nadru Yakhni', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Haak', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Kashmiri Saag', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Chaman', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Nadru Monje', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Modur Pulao', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Phirni', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // RAJASTHANI CUISINE (~45 dishes)
    // ========================================
    'rajasthani': [
        // Breakfast (15 dishes)
        { name: 'Pyaaz Kachori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Mawa Kachori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Mirchi Vada', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Poha', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Besan Gatte', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dal Kachori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Raj Kachori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Bikaneri Bhujia', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Ghevar', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Malpua', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Churma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Besan Chilla', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Methi Bajra Roti', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Makhaniya Lassi', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Rabdi', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch (15 dishes)
        { name: 'Dal Baati Churma', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Gatte ki Sabzi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Ker Sangri', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Papad ki Sabzi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Bajra Roti with Lehsun Chutney', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Panchmel Dal', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Mohan Maas', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Laal Maas', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Safed Maas', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Achari Murgh', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Besan Gatte', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kadhi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sangri ki Sabzi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Ghevar', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Moong Dal Halwa', mealSlots: ['lunch'], foodType: 'veg' },

        // Dinner (15 dishes)
        { name: 'Dal Baati Churma', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Gatte ki Sabzi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Ker Sangri', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Papad ki Sabzi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Panchmel Dal', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Laal Maas', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mohan Maas', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Safed Maas', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Jungli Maas', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Besan Gatte', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Kadhi', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bajra Roti', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Pyaaz Kachori', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Ghevar', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Moong Dal Halwa', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // KERALA CUISINE (~45 dishes)
    // ========================================
    'kerala': [
        // Breakfast (15 dishes)
        { name: 'Appam', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Puttu', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Idiyappam', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Idli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Vellayappam', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pathiri', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pazham Pori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Unniyappam', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pazhampori', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kadala Curry', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Egg Roast', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Egg Curry Kerala', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Fish Fry', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Beef Fry', mealSlots: ['breakfast'], foodType: 'non-veg' },

        // Lunch (15 dishes)
        { name: 'Kerala Sadya', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sambar', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Avial', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Thoran', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Pachadi', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Olan', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Erissery', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Pulissery', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Fish Moilee', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Kerala Fish Curry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Karimeen Pollichathu', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Stew', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Beef Curry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Prawn Curry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Meen Curry', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Appam with Stew', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Puttu with Kadala', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Idiyappam', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dosa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Kerala Parotta', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Sambar Rice', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Avial', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Thoran', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Fish Moilee', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Kerala Fish Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Stew', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Beef Fry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Prawn Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Egg Roast', mealSlots: ['dinner'], foodType: 'egg' },
        { name: 'Payasam', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // KARNATAKA CUISINE (~45 dishes)
    // ========================================
    'karnataka': [
        // Breakfast (15 dishes)
        { name: 'Masala Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Bisi Bele Bath', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Idli Vada', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Rava Idli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Set Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Neer Dosa', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Akki Roti', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Ragi Mudde', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Uppittu', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kesari Bath', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Pongal', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Rava Upma', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Chitranna', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kali Dose', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Kadabu', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch (15 dishes)
        { name: 'Bisi Bele Bath', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Sambar Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Rasam Rice', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Huli', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Gojju', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Palya', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Kootu', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Saaru', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Vangi Bath', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chitranna', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Akki Roti', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Ragi Mudde', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Chicken Saaru', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Mutton Saaru', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Meen Gassi', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Masala Dosa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bisi Bele Bath', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Idli Vada', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Set Dosa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Neer Dosa', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Akki Roti', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Ragi Mudde', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Vangi Bath', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Sambar Rice', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Rasam Rice', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Gojju', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Chicken Saaru', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mutton Saaru', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Meen Gassi', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mysore Pak', mealSlots: ['dinner'], foodType: 'veg' },
    ],

    // ========================================
    // GOAN CUISINE (~45 dishes)
    // ========================================
    'goan': [
        // Breakfast (15 dishes)
        { name: 'Poee', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Sanna', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Patoli', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Ros Omelette', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Egg Chilli Fry', mealSlots: ['breakfast'], foodType: 'egg' },
        { name: 'Chorizo Bread', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Goan Sausage', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Chicken Xacuti', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Prawn Balchao', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Fish Fry', mealSlots: ['breakfast'], foodType: 'non-veg' },
        { name: 'Bebinca', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Patoleo', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Alle Belle', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Nevri', mealSlots: ['breakfast'], foodType: 'veg' },
        { name: 'Dodol', mealSlots: ['breakfast'], foodType: 'veg' },

        // Lunch (15 dishes)
        { name: 'Fish Curry Rice', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Vindaloo', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Xacuti', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Cafreal', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Sorpotel', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Prawn Curry', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Crab Xec Xec', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Ambot Tik', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Recheado', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Balchao', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Goan Veg Curry', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Mushroom Xacuti', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Veg Vindaloo', mealSlots: ['lunch'], foodType: 'veg' },
        { name: 'Feijoada', mealSlots: ['lunch'], foodType: 'non-veg' },
        { name: 'Chicken Cafreal', mealSlots: ['lunch'], foodType: 'non-veg' },

        // Dinner (15 dishes)
        { name: 'Fish Curry Rice', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Vindaloo', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Xacuti', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Cafreal', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Sorpotel', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Prawn Curry', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Crab Xec Xec', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Recheado', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Chicken Cafreal', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Goan Sausage', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Balchao', mealSlots: ['dinner'], foodType: 'non-veg' },
        { name: 'Mushroom Xacuti', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Bebinca', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Dodol', mealSlots: ['dinner'], foodType: 'veg' },
        { name: 'Serradura', mealSlots: ['dinner'], foodType: 'veg' },
    ],
};

/**
 * Get all dishes flattened with cuisine tag
 */
export const getAllDishesWithCuisine = (): Array<CuisineDish & { cuisine: CuisineType }> => {
    const allDishes: Array<CuisineDish & { cuisine: CuisineType }> = [];

    (Object.keys(CUISINE_DISHES) as CuisineType[]).forEach((cuisine) => {
        CUISINE_DISHES[cuisine].forEach((dish) => {
            allDishes.push({ ...dish, cuisine });
        });
    });

    return allDishes;
};
