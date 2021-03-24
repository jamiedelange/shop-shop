const initialState = {
    cart: [],
    cartOpen: false
}

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case 'cart/ADD_TO_CART': {
            return {
                cart: [
                    ...state.cart,
                    action.payload
                ],
                cartOpen: true,
            }
        }
        case 'cart/REMOVE_FROM_CART': {
            let newCart = state.cart.filter((product) => {
                return product._id !== action.payload;
            });
            return {
                cart: newCart,
                cartOpen: newCart.length > 0
            }
        }
        case 'cart/ADD_MULTIPLE_TO_CART': {
            return {
                ...state,
                cart: [
                    ...state.cart,
                    ...action.payload
                ]
            }
        }
        case 'cart/UPDATE_CART_QUANTITY': {
            return {
                cartOpen: true,
                cart: state.cart.map((product) => {
                    if (action.payload._id === product._id) {
                        product.purchaseQuantity = action.payload.purchaseQuantity;
                    }
                    return product;
                })
            }
        }
        case 'cart/TOGGLE_CART': {
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        }
        case 'cart/CLEAR_CART': {
            return {
                cart: [],
                cartOpen: false
            }
        }
        default: return state;
    }
}