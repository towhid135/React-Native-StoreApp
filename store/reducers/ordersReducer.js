import { ADD_ORDER } from "../actions/ordersAction";
import Order from "../../models/Order";
const initialState = {
    orders: []
}

export default (state=initialState,action) => {
    switch(action.type){
        case ADD_ORDER:
            const newOrders = new Order(
                Date.toString(),
                action.orderData.item,
                action.orderData.amount,
                Date()
                )
            return {...state,orders: state.orders.concat(newOrders)}
    }
    return state;
}