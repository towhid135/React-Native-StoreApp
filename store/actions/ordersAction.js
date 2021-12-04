export const ADD_ORDER = "ADD_ORDER";
export const FETCH_ORDER = 'FETCH_ORDER';
import Order from "../../models/Order";

//action creator
export const fetchOrder = () =>{
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try{

        const response = await fetch(`https://store-605d1-default-rtdb.firebaseio.com/orders/${userId}.json`)
        
        if(!response.ok){
            //if status code is 200 then response is okay
            throw new Error('An error occured!');
        }
        
        const resData = await response.json();
        
        const loadedOrders = [];
        for (const key in resData){
            const orderItem = new Order(
                key,
                resData[key].cartItems,
                resData[key].totalAmount,
                new Date (resData[key].date)
            )
            loadedOrders.push(orderItem);
        }

        dispatch({
            type: FETCH_ORDER,
            orders: loadedOrders
        })

        }catch(err){
            throw new Error(err)
        }

    }
}

export const addOrder = (cartItems,totalAmount) => {

    const date = new Date();
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        const response = await fetch(`https://store-605d1-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })
        if(!response.ok){
            const errObj = await response.json();
            console.log('ordersAction error: ',errObj.error.message);
        }
        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                item: cartItems, 
                amount: totalAmount,
                date: date
            } ,
        })
    }
    
}