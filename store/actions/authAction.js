export const SIGNUP = 'SIGNUP';

export const Signup = (email,password) =>{
    return async dispatch =>{

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAiB1jmkLHogyViX0devJz2K6V2Vy_WNc8',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )
        
        if(!response.ok) throw new Error('Error occured during signup');

        const resData = response.json();
        console.log(resData);

        dispatch({
            type: SIGNUP,
        })
    }
}