import PRODUCTS from "../../data/dummy-data";
import { 
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    FETCH_PRODUCT 
} from "../actions/productsAction";
import Product from "../../models/product";


const initialState = {
    availableProducts: [],
    userProducts: [],
}

export default (state=initialState, action) => {
    switch(action.type){
        case CREATE_PRODUCT:
            const newProduct = new Product(
                action.productData.id,
                action.productData.ownerId,
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
        case FETCH_PRODUCT:
            //console.log('from productReducer: action.ownerId',action.ownerId);
            //console.log('from productReducer: fetchedProducts',action.fetchedProducts);
            return {
                ...state, 
                availableProducts: [...PRODUCTS,...action.fetchedProducts],
                userProducts: [...PRODUCTS,...action.fetchedProducts].filter((prod) => prod.ownerId === action.ownerId)
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