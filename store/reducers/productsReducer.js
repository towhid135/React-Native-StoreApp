import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/productsAction";

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

export default (state=initialState, action) => {
    switch(action.type){
        case DELETE_PRODUCT:
            return{
                ...state,
                availableProducts: state.availableProducts.filter((product) => product.id !== action.pid),
                userProducts: state.userProducts.filter((product) => product.id !== action.pid)
            }
    }
    return state;
}