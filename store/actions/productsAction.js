export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export const deleteProduct = productId =>{

    return async (dispatch,getState) => {
        const token = getState().auth.token;
        await fetch(`https://store-605d1-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,{
            method: 'DELETE'
        })

        dispatch({
            type: DELETE_PRODUCT, pid: productId
        })
    }
}

/*In modern javascript if the property and it's value is same then we can only write 
property name in javascript object */
export const createProduct = (title,description,imageUrl,price) =>{


    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://store-605d1-default-rtdb.firebaseio.com/products.json?auth=${token}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                imageUrl,
                price,
                ownerId: userId
            })
        })

        const resData = await response.json();

        dispatch(
            {
                type:CREATE_PRODUCT, 
                productData:{
                    id: resData.name,
                    title: title,
                    description: description,
                    imageUrl,
                    price,
                    ownerId: userId
                }
            }
        )
    }

}

export const fetchProduct = () =>{
    return async (dispatch,getState) => {
        const userId = getState().auth.userId;
        try{

        const response = await fetch('https://store-605d1-default-rtdb.firebaseio.com/products.json')
        
        if(!response.ok){
            throw new Error('An error occured!');
        }
        
        const resData = await response.json();
        
        //if(resData===null) throw new Error('There is no product in server')
        
        let fetchedProducts = [];
        if(resData!=null){
            for (const key in resData){
                resData[key] = {...resData[key],id:key}
            }
    
            fetchedProducts = Object.values(resData);
        }
        //console.log('fetched products',fetchedProducts,'count',count);

        dispatch({
            type: FETCH_PRODUCT,
            fetchedProducts: fetchedProducts,
            ownerId: userId
        })
    } catch (err) {
        throw err;
    }
        
    }
}

export const updateProduct = (id,title,description,imageUrl) =>{
    
    return async (dispatch,getState) => {
        const token = getState().auth.token;
        //here we have used back ticks instead of quote
        const response = await fetch(`https://store-605d1-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
        {
            /* if method is PATCH then only changed value would be updated. if method is PUT then the 
            whole data will be override */
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: description,
                imageUrl: imageUrl,
                title: title
            })
        }
        );

        if(!response.ok) throw new Error("Something went wrong!");

        dispatch(
            {
                type:UPDATE_PRODUCT, 
                pid: id,
                productData:{
                title: title,
                description: description,
                imageUrl,
            }}
        )
    }
}