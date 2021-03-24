import { combineReducers } from 'redux';
import productsReducer from './slices/products';
import categoriesReducer from './slices/categories';
import cartReducer from './slices/cart';

const rootReducer = combineReducers({
    cart: cartReducer,
    products : productsReducer,
    categories: categoriesReducer
});

export default rootReducer;