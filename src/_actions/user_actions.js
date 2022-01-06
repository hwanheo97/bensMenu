import axios from 'axios';
import { USER_SERVER } from '../components/Config.js';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY
} from './types';

//import { response } from 'express';  

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit, { withCredentials: true })   
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`, { withCredentials: true }) 
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`, { withCredentials: true })  
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id){

    let body = {
        productId :id   
    }
    //body를넣고 addToCart end point를 backend로(routes/users.js) 보내기(21.9/8)
    const request = axios.post(`${USER_SERVER}/addToCart`,body,{withCredentials:true})
    .then(response => response.data);
    
    //request를 받아 reducer.js로 가기
    return {
        type: ADD_TO_CART,
        payload: request
        
    }
}

export function getCartItems(cartItems,userCart){

    const request = axios.get(`https://bensmenu.herokuapp.com/api/product/products_by_id?id=${cartItems}&type=array`)
    .then(response => {
        //routes/product.js에서 request받아와서
        //CartIiem들에 해당하는 정보들을 Product Collection에서 가져온후 qiantity정보를 넣어준다
         //error 3)redux 간단하게 product.js수정경우 data. 의product 없애도 됨
        userCart.forEach(cartItem => {
            response.data.forEach((productDetail, index) => {  
                if(cartItem.id === productDetail._id){
                    response.data[index].quantity= cartItem.quantity  //3)redux 간단하게 product.js수정경우 product 없애도 됨
                }
            })
          })
          return response.data;
        //return 후 user_reducer.js 로 가기
    });
    
    //request를 받아 reducer.js로 가기
    return {
        type: GET_CART_ITEMS,
        payload: request
        
    }
}
export function removeCartItem(productId){

    const request = axios.get(`https://bensmenu.herokuapp.com/api/users/removeFromCart?id=${productId}`, { withCredentials: true })   //,{withCredentials:true}
    .then(response => {
        //routes/user.js에서 request받아와서
        
        //productInfo,cart 정보를 조합해서 cartDetail을 만들기  => user_reducer로 
        response.data.cart.forEach(item => {
            response.data.productInfo.forEach((product,index) =>{
                if(item.id === product._id){
                    response.data.productInfo[index].quantity = item.quantity
                }
            })
        })
          return response.data;
        //return 후 user_reducer.js 로 가기
    });
     //3)request를 받아 reducer.js로 가기
    return {
        type: REMOVE_CART_ITEM,
        payload: request
     }
}
//CartPage 에서 dispatch한 두개 paymentData 와 cartDetail 을 data로받기,//end point와 data
   //3)request를 받아 reducer.js로 가기
export function onSuccessBuy(data){    
    const request = axios.post(`https://bensmenu.herokuapp.com/api/users/successBuy`,data, { withCredentials: true })      //,{withCredentials:true}
    .then(response => response.data );
     
    return {
        type: ON_SUCCESS_BUY,
        payload: request
     }
}