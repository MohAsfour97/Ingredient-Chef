import pancakesImg from '@assets/generated_images/fluffy_pancakes_with_syrup.png';
import pastaImg from '@assets/generated_images/tomato_basil_pasta_dish.png';
import saladImg from '@assets/generated_images/fresh_greek_salad.png';
import stirfryImg from '@assets/generated_images/vegetable_stir_fry.png';

export interface Ingredient {
id: string;
name: string;
emoji: string;
category: 'Protein' | 'Produce' | 'Dairy' | 'Pantry';
color: string;
}

export interface Recipe {
id: string;
name: string;
description: string;
image: string;
requiredIngredients: string[]; // IDs
time: string;
calories: string;
difficulty: 'Easy' | 'Medium' | 'Hard';
steps: string[];
}

export const ingredients: Ingredient[] = [
{ id: 'eggs', name: 'Eggs', emoji: '🥚', category: 'Protein', color: 'bg-yellow-100 text-yellow-700' },
{ id: 'flour', name: 'Flour', emoji: '🌾', category: 'Pantry', color: 'bg-stone-100 text-stone-700' },
{ id: 'milk', name: 'Milk', emoji: '🥛', category: 'Dairy', color: 'bg-blue-50 text-blue-700' },
{ id: 'tomato', name: 'Tomato', emoji: '🍅', category: 'Produce', color: 'bg-red-100 text-red-700' },
{ id: 'cheese', name: 'Cheese', emoji: '🧀', category: 'Dairy', color: 'bg-orange-100 text-orange-700' },
{ id: 'pasta', name: 'Pasta', emoji: '🍝', category: 'Pantry', color: 'bg-amber-100 text-amber-700' },
{ id: 'lettuce', name: 'Lettuce', emoji: '🥬', category: 'Produce', color: 'bg-green-100 text-green-700' },
{ id: 'chicken', name: 'Chicken', emoji: '🍗', category: 'Protein', color: 'bg-orange-50 text-orange-800' },
{ id: 'oil', name: 'Olive Oil', emoji: '🫒', category: 'Pantry', color: 'bg-lime-100 text-lime-700' },
{ id: 'garlic', name: 'Garlic', emoji: '🧄', category: 'Produce', color: 'bg-purple-50 text-purple-700' },
{ id: 'onion', name: 'Onion', emoji: '🧅', category: 'Produce', color: 'bg-rose-50 text-rose-700' },
{ id: 'peppers', name: 'Peppers', emoji: '🫑', category: 'Produce', color: 'bg-green-50 text-green-700' },
{ id: 'rice', name: 'Rice', emoji: '🍚', category: 'Pantry', color: 'bg-stone-50 text-stone-600' },
{ id: 'beef', name: 'Beef', emoji: '🥩', category: 'Protein', color: 'bg-red-50 text-red-800' },
];

export const recipes: Recipe[] = [
{
id: 'pancakes',
name: 'Cloud Fluffy Pancakes',
description: 'Light as air pancakes served with fresh berries and warm maple syrup.',
image: pancakesImg,
requiredIngredients: ['eggs', 'flour', 'milk'],
time: '15 min',
calories: '350 kcal',
difficulty: 'Easy',
steps: [
'Whisk eggs and milk together until frothy.',
'Sift in flour and fold gently.',
'Cook on a hot griddle until golden brown.',
'Serve with syrup and berries.'
]
},
{
id: 'pasta',
name: 'Rustic Tomato Basil Pasta',
description: 'Classic Italian comfort food with fresh vine-ripened tomatoes.',
image: pastaImg,
requiredIngredients: ['pasta', 'tomato', 'garlic', 'oil', 'cheese'],
time: '20 min',
calories: '420 kcal',
difficulty: 'Medium',
steps: [
'Boil pasta in salted water.',
'Sauté garlic in olive oil until fragrant.',
'Add chopped tomatoes and simmer.',
'Toss pasta with sauce and finish with cheese.'
]
},
{
id: 'salad',
name: 'Mediterranean Crisp Salad',
description: 'A refreshing mix of crisp greens, salty feta, and olives.',
image: saladImg,
requiredIngredients: ['lettuce', 'tomato', 'cheese', 'oil', 'onion'],
time: '10 min',
calories: '210 kcal',
difficulty: 'Easy',
steps: [
'Chop all vegetables into bite-sized pieces.',
'Toss with olive oil and seasoning.',
'Crumble feta cheese on top.',
'Serve chilled.'
]
},
{
id: 'stirfry',
name: 'Sizzling Veggie Stir Fry',
description: 'Quick, healthy, and packed with vibrant crunchy vegetables.',
image: stirfryImg,
requiredIngredients: ['peppers', 'onion', 'garlic', 'oil', 'rice'],
time: '25 min',
calories: '380 kcal',
difficulty: 'Medium',
steps: [
'Cook rice according to package instructions.',
'Heat oil in a wok over high heat.',
'Stir fry vegetables until tender-crisp.',
'Serve vegetables over steaming rice.'
]
}
];
