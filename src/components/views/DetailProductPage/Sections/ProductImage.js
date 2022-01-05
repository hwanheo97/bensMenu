import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery'

function ProductImage(props) {

    const [Images,setImages] = useState([])
     
    //2)Life Cycle 작동
    useEffect(()=>{
        if(props.detail.images && props.detail.images.length >0){
            let images =[]
            props.detail.images.map(item =>{
                images.push({
                    original:`https://bensmenu.herokuapp.com/${item}`,
                    thumbnail:`https://bensmenu.herokuapp.com/${item}`,
                })
                setImages(images)
            })
        }
    },[props.detail])
    // 3)props.detail 이 바뀔때마다 useEffect를 한번더 실행기킴

    // const images = [
    //     {
    //         original: 'https://picsum.photos/id/1018/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1015/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //     },
    //     {
    //         original: 'https://picsum.photos/id/1019/1000/600/',
    //         thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //     },
    // ];

    //1)rendering
  return (
    <div>
      <ImageGallery  items={Images} />
    </div>
  )
}

export default ProductImage
