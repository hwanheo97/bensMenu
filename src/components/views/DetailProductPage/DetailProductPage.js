import React, { useEffect,useState } from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import {Row,Col}  from 'antd'

function DetailProductPage(props) {

    const productId =props.match.params.productId
    // productId는 각 image의 unitque id, &type=single 하나만 가져오기

    // 초기화 객체화 {}
    const [Product,setProduct] = useState({})

    useEffect(()=>{
        axios.get(`https://bensmenu.herokuapp.com/api/product/products_by_id?id=${productId}&type=single`)
            .then(response =>{
                setProduct(response.data[0])
            })
            .catch(err  => alert(err) )
            //     if(response.data.success){
            //         console.log('DetailPage => response.data ',response.data)
            //         setProduct(response.data.product[0])
            //     }else{
            //         alert('상세 정보 가져오기를 실패했습니다.')
            //     }
            // })

            // 2) redux 안 간단하게  if(){}안에 setProduct(response.data[0])  <= (response.data.product[0])
            
     },[])

  return (
    <div style={{width:'100%', padding:'3rem 4rem'}}>
        <div style={{display:'flex', justifyContent:'center'}}>
            <h1>{Product.title}</h1>
        </div>
        <br/>

        <Row gutter={[16,16]}>
            <Col lg={12} sm={24}>
                {/* ProductImage  ,   detail 안에 모든 Product정보 넣기, lg 는 12로 두개로 나누기 */}
                <ProductImage detail={Product} />
            </Col>
            
            <Col lg={12} sm={24}>
                {/* ProductInfo */}
                <ProductInfo detail={Product} />
            </Col>

        </Row>

    </div>
  )
}

export default DetailProductPage
