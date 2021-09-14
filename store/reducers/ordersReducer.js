import { ADD_ORDER } from "../actions/ordersAction";
import Order from "../../models/Order";
const initialState = {
    orders: []
}

export default (state=initialState,action) => {
    switch(action.type){
        case ADD_ORDER:
            console.log('from ordesReducer',state.orders.length.toString());
            //console.log(new Date.toString());
            const newOrders = new Order(
                state.orders.length.toString(),
                action.orderData.item,
                action.orderData.amount,
                new Date()
                )
            return {...state,orders: state.orders.concat(newOrders)}
    }
    return state;
}