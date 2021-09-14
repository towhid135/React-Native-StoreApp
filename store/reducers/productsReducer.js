import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT,CREATE_PRODUCT,UPDATE_PRODUCT } from "../actions/productsAction";
import Product from "../../models/product";


const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

export default (state=initialState, action) => {
    switch(action.type){
        case CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price,
                )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }
        case UPDATE_PRODUCT:
            const productIndex = state.userProducts.findIndex((prod) => prod.id === action.pid)
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
                )
            //updating user products
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;
            //updating available  products
            const avialableProductIndex = state.availableProducts.findIndex((prod) => prod.id === action.pid)
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[avialableProductIndex] = updatedProduct;
            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            }

        case DELETE_PRODUCT:
            return{
                ...state,
                availableProducts: state.availableProducts.filter((product) => product.id !== action.pid),
                userProducts: state.userProducts.filter((product) => product.id !== action.pid)
            }
    }
    return state;
}