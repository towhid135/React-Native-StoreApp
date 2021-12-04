import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';

export const Authentication = (token,userId) =>{
    return {type: AUTHENTICATE, token:token,userId: userId}
}

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

        if(!response.ok) {
            const errorObj = await response.json();
            const errorMessage = errorObj.error.message;
            switch(errorMessage){
                case 'MISSING_PASSWORD':
                    throw new Error('Please enter the password');
                    break;
                case 'EMAIL_EXISTS':
                    throw new Error('The email has already used')
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    throw new Error('We have blocked all requests from this device due to unusual activity. Try again later')
                    break;
                default:
                    throw new Error(errorMessage)
            }
            
        }

        const resData = await response.json();
        dispatch(Authentication({
            token: resData.idToken,
            userId: resData.localId
        }))
        //storing signup data locally
        const expirationDate = new Date ( new Date().getTime() + parseInt(resData.expiresIn) * 1000 );
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
}

export const Login = (email,password) =>{
    return async dispatch =>{

        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAiB1jmkLHogyViX0devJz2K6V2Vy_WNc8',
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
        
        if(!response.ok) {
            const errorObj = await response.json();
            const errorMessage = errorObj.error.message;
            switch(errorMessage){
                case 'EMAIL_NOT_FOUND':
                    throw new Error('Before login please signup');
                    break;
                case 'INVALID_PASSWORD':
                    throw new Error('The password is invalid or the user does not have a password')
                    break;
                case 'USER_DISABLED':
                    throw new Error(' The user account has been disabled by an administrator')
                    break;
                default:
                    throw new Error(errorMessage)
            }
        }

        const resData = await response.json();
        dispatch(Authentication({
            token: resData.idToken,
            userId: resData.localId
        }))
        //storing login data locally
        const expirationDate = new Date ( new Date().getTime() + parseInt(resData.expiresIn) * 1000 );
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
}

const saveDataToStorage = async (token,userId,expirationDate) =>{
    await AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString()
        })
    )
};