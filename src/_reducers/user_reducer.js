import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from '../_actions/types';
//import { onSuccessBuy } from '../_actions/user_actions';

 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_CART:
              return {...state,
                        userData:{
                             ...state.userData,  
                             //원래있던 useData넣기
                             cart:action.payload  
                            //cart에 넣기,action.payload= users.js의 userInfo.cart <=   res.status(200).send(userInfo.cart)
               }
            }
        case GET_CART_ITEMS:
            //4) user_actions.js 의 return response.data가 cartDetail:action.payload로 들어오게 됨
            return {...state,cartDetail:action.payload}
            //4) user_actions.js 의 return response.data가 cartDetail:action.payload로 들어오게 됨
        case REMOVE_CART_ITEM:
            return {...state,cartDetail:action.payload.productInfo,
                              userData:{
                                  ...state.userData,     
                                  cart: action.payload.cart 
                              }
            }
         case ON_SUCCESS_BUY:
             return {...state,cartDetail:action.payload.cartDetail,
                userData:{
                    ...state.userData,cart:action.payload.cart      
                }
                
            }
            //router.post('/successBuy',auth,(req,res) => { }처리후 state값 채우기,routes/user.js의 action.payload.cartDetail = cartDetail[]
            //처리후 cartPage.js 가기
        default:
            return state;
    }
}