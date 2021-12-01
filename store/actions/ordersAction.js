export const ADD_ORDER = "ADD_ORDER";

//action creator
export const addOrder = (cartItems,totalAmount) => {

    const date = new Date();
    return async dispatch => {
        const response = await fetch('https://store-605d1-default-rtdb.firebaseio.com/orders/u1.json',{
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