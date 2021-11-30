export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export const deleteProduct = productId =>{

    return async dispatch => {
        await fetch(`https://store-605d1-default-rtdb.firebaseio.com/products/${productId}.json`,{
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


    return async dispatch =>{

        const response = await fetch('https://store-605d1-default-rtdb.firebaseio.com/products.json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description,
                imageUrl,
                price,
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
                }
            }
        )
    }

}

export const fetchProduct = () =>{
    return async dispatch => {
        try{

            const response = await fetch('https://store-605d1-default-rtdb.firebaseio.com/products.json')
        
        if(!response.ok){
            //if status code is 200 then response is okay
            throw new Error('An error occured!');
        }
        
        const resData = await response.json();

        //const fetchedProducts = Object.values(resData);
        //const key = Object.keys(resData);
        //console.log('keys',key);
        //console.log('fetched products',fetchedProducts);

        for (const key in resData){
            resData[key] = {...resData[key],id:key}
        }

        const fetchedProducts = Object.values(resData);
        //console.log('fetched products',fetchedProducts,'count',count);

        dispatch({
            type: FETCH_PRODUCT,
            fetchedProducts: fetchedProducts
        })
    } catch (err) {
        throw err;
    }
        
    }
}

export const updateProduct = (id,title,description,imageUrl) =>{
    
    return async dispatch => {
        //here we have used back ticks instead of quote
        await fetch(`https://store-605d1-default-rtdb.firebaseio.com/products/${id}.json`,
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