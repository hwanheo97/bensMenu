
import React from 'react'
import {Icon,Col,Card,Row,Carousel} from 'antd'


function ImageSlider(props) {
  return (
    <div>
      {/* carosel: 수화물 컨테이너 벨트 */}
      <Carousel autoplay>
        {props.images.map((image,index) => (
            <div key={index}>
                 <img style={{width:'100%', maxHeight:'150px'}} 
                    src={`https://bensmenu.herokuapp.com/${image}`}  />                     
            </div>
        ))}
      </Carousel>
    </div>
  )
}

export default ImageSlider


