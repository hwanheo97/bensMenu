import React, {useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems, removeCartItem, onSuccessBuy} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { Empty,Result } from 'antd';
import Paypal from '../../utils/Paypal';

function CartPage(props) {
 
  const dispatch = useDispatch();

  const [Total,setTotal] =useState(0)
  const [ShowTotal,setShowTotal] = useState(false) 
  // true일때만 가격 보여주기,처음에 안보여야 해서 false
  const [ShowSuccess,setShowSuccess] = useState(false)

  useEffect(() =>{
   
    let cartItems = []

    //redux User state안에 cart안에 상품이 들어있는 지 확인
    if(props.user.userData && props.user.userData.cart){
        if(props.user.userData.cart.length > 0){
          props.user.userData.cart.forEach(item => {
              cartItems.push(item.id)
          })
          dispatch(getCartItems(cartItems, props.user.userData.cart))
             .then(response =>  {calculateTotal(response.payload)})  //console.log('CartPage' , response)) 
       }
    }
  },[props.user.userData])

  let calculateTotal =(cartDetail) =>{
    let total =0;
//Objects, {} in JavaScript does not have the method .map(). It's only for Arrays, [].
//→ 오브젝트는 map()함수를 가지고있지 않아 사용할 수가 없다. 배열만 가능하다.
//→ data.map()으로 썻으면 data.product.map()으로 코드를 바꿔라 왜냐면 product가 배열이니깐 잘 반복될거야

    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity
    })
    setTotal(total)
    setShowTotal(true)
  }

  let removeFromCart = (productId) => {
    //2) redux action =removeCartItem  => user_actions.js의 export function removeCartItem
    dispatch(removeCartItem(productId))
    .then(response =>{
      //console.log('remove버튼 response',response)
      if(response.payload.productInfo.length <=0){
        setShowTotal(false)

      }

    })
  }
    const transactionSuccess = (data) => {
      dispatch(onSuccessBuy({       
         paymentData : data,     
        cartDetail : props.user.cartDetail    

      }))
        .then(response => {
        if(response.payload.success){
          setShowTotal(false)    
          setShowSuccess(true)   
        }
      })
    }

  return (
    <div style={{width:'85%', margin:'3rem auto'}}>
        <h1>My Cart </h1>
        <div>
          <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
          {/* //3)redux 간단하게 product.js수정경우 products={props.user.cartDetail  && props.user.cartDetail.product}중 && props.user.cartDetail.product 없애도 됨 */}
        </div>

        {ShowTotal ?
            <div style={{marginTop:'3rem'}}>
            <h2>Total Amount : ${Total}</h2>
          </div>
          : ShowSuccess ?
             <Result
              status="success"
              title="Successfully Purchased Items"
            />
          :
          <>
          <br/>
          <br/>
            <Empty description={false}/>
            <br/>
          </>
         
      }
           {/* <p style={{textAlign:'center' ,color:'red'}}>카트에 선택하신 상품이 없습니다</p> */}
            {ShowTotal && 
             <Paypal 
             total = {Total}
             onSuccess={transactionSuccess}
             />
            
            }
    </div>
  )
}

export default CartPage
