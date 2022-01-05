import React from 'react'
import "./UserCardBlock.css";

function UserCardBlock(props) {

  // 이미지가 두개이상이상이면 첫번째이미지만 가져오기
  const renderCartImage =(images) => {
    if(images.length > 0){
      let image = images[0]
      return `https://bensmenu.herokuapp.com/${image}`
    }
  }

   const renderItems = () => (
    props.products && props.products.map((product,index) => (
        <tr key={index}>
          <td>
            <img style={{width:'70px'}} alt="product" src={renderCartImage(product.images)}  />
          </td>
          <td>
            {product.quantity}  EA
          </td>
          <td>
            ${product.price}
          </td>
          <td>
            <button onClick={()=>props.removeItem(product._id)}>Remove</button>
            {/* 1)버튼을 누르면 CartPage.js 의 props.removeItem 호출 */}
          </td>
        </tr>

    ))
  )

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Product from Cart</th>
          </tr>
        </thead>
        <tbody>
           {renderItems()}
        </tbody>
      </table>
      
    </div>
  )
}

export default UserCardBlock
