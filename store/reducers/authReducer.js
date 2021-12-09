import { AUTHENTICATE,LOGOUT,SET_FLAG } from "../actions/authAction";

const initialState = {
    token: null,
    userId: null,
    flag: false
}

export default authReducer = (state=initialState,action) =>{
    switch(action.type){
        case AUTHENTICATE:
            //console.log('inside AuthReducer: token,user',action.token,action.userId)
            return {...state,token:action.token,userId: action.userId}
        // case SIGNUP:
        //     return {...state,token:action.token,userId: action.userId}
        case LOGOUT:
            return initialState;
        case SET_FLAG:
            return {...state,flag:true}
        default:
            return state
    }
}