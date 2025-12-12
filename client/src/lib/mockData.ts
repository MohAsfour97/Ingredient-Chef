import pancakesImg from '@assets/generated_images/fluffy_pancakes_with_syrup.png';
import pastaImg from '@assets/generated_images/tomato_basil_pasta_dish.png';
import saladImg from '@assets/generated_images/fresh_greek_salad.png';
import stirfryImg from '@assets/generated_images/vegetable_stir_fry.png';

export interface Ingredient {
  id: string;
  nameKey: string; // i18n key for ingredient name
  emoji: string;
  category: 'Protein' | 'Produce' | 'Dairy' | 'Pantry';
  color: string;
}

export interface Recipe {
  id: string;
  nameKey: string; // i18n key for recipe name
  descriptionKey: string; // i18n key for recipe description
  image: string;
  requiredIngredients: string[]; // IDs from ingredients
  time: string;
  calories: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  steps: string[]; // optional: can be translated if needed
}

export const ingredients: Ingredient[] = [
  { id: 'eggs', nameKey: 'ingredients.eggs', emoji: '🥚', category: 'Protein', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'flour', nameKey: 'ingredients.flour', emoji: '🌾', category: 'Pantry', color: 'bg-stone-100 text-stone-700' },
  { id: 'milk', nameKey: 'ingredients.milk', emoji: '🥛', category: 'Dairy', color: 'bg-blue-50 text-blue-700' },
  { id: 'tomato', nameKey: 'ingredients.tomato', emoji: '🍅', category: 'Produce', color: 'bg-red-100 text-red-700' },
  { id: 'cheese', nameKey: 'ingredients.cheese', emoji: '🧀', category: 'Dairy', color: 'bg-orange-100 text-orange-700' },
  { id: 'pasta', nameKey: 'ingredients.pasta', emoji: '🍝', category: 'Pantry', color: 'bg-amber-100 text-amber-700' },
  { id: 'lettuce', nameKey: 'ingredients.lettuce', emoji: '🥬', category: 'Produce', color: 'bg-green-100 text-green-700' },
  { id: 'chicken', nameKey: 'ingredients.chicken', emoji: '🍗', category: 'Protein', color: 'bg-orange-50 text-orange-800' },
  { id: 'oil', nameKey: 'ingredients.oil', emoji: '🫒', category: 'Pantry', color: 'bg-lime-100 text-lime-700' },
  { id: 'garlic', nameKey: 'ingredients.garlic', emoji: '🧄', category: 'Produce', color: 'bg-purple-50 text-purple-700' },
  { id: 'onion', nameKey: 'ingredients.onion', emoji: '🧅', category: 'Produce', color: 'bg-rose-50 text-rose-700' },
  { id: 'peppers', nameKey: 'ingredients.peppers', emoji: '🫑', category: 'Produce', color: 'bg-green-50 text-green-700' },
  { id: 'rice', nameKey: 'ingredients.rice', emoji: '🍚', category: 'Pantry', color: 'bg-stone-50 text-stone-600' },
  { id: 'beef', nameKey: 'ingredients.beef', emoji: '🥩', category: 'Protein', color: 'bg-red-50 text-red-800' },
];

export const recipes: Recipe[] = [
  {
    id: 'pancakes',
    nameKey: 'recipes.pancakes.name',
    descriptionKey: 'recipes.pancakes.description',
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
    nameKey: 'recipes.pasta.name',
    descriptionKey: 'recipes.pasta.description',
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
    nameKey: 'recipes.salad.name',
    descriptionKey: 'recipes.salad.description',
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
    nameKey: 'recipes.stirfry.name',
    descriptionKey: 'recipes.stirfry.description',
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
