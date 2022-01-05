import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import {Icon} from 'antd';
import axios from 'axios';  
//bakend 에 파일전달 라이브러리

function FileUpload(props) {   
  //저장된 파일을 프런트엔드에 전달해주는 기능, 아래 ,27, 44line props 사용위해 인자 넣기
 
  const [Images,setImages] = useState([])   //이미지를 여러개 배열로 []
 
  const dropHandler =(files) => {
   
    let formData = new FormData();
    const config ={
      header:{'content-type' : 'multipart/form-data'} //backend 에 request시 형식 알리기
    }
    formData.append("file",files[0])
    //formData안에 file을 올리면 file정보 들어감 
    axios.post('https://bensmenu.herokuapp.com/api/product/image',formData,config)  //request:백엔드에 file request 보낼때 error 방지 위해 formData,config 인자 사용
      .then(response => {
          if(response.data.success){
            //alert('파일을 저장하는데 성공했습니다.')
            console.log('file upload response.data',response.data)  // //backend에서 frontend로 정보 전달 : 파일 경로, 파일명이 오게됨
             setImages([...Images,response.data.filePath])  
            // ...Images  spread operator를 이용 모든 image 저장 ,새로운 response.data.filePath를 Images에 setImages하면 새로운 이미지가 생기게 됨
            props.refreshFunction([...Images,response.data.filePath])   //image file을 올릴때 부모 UploadProductPage의 props 호출하여 변경시키기
          }else{
            alert('파일을 저장하는데 실패했습니다.')
          }
        })
      }  //end of dropHandler
  
  const deleteHandler =(image) => {
    const currentIndex = Images.indexOf(image)    //image의 indexOF() 메소드 이용 index 찾기
    //console.log('currentIndex',currentIndex);
    let newImages = [...Images]   //Images 배열에 있는 모든 images를 newImages에 복사
    newImages.splice(currentIndex,1)    //currendex 1개를 지우는 메소드 splice
    setImages(newImages)               //newImages를 셋팅하고 부모  UploadProductPage에 넘겨주어야함
    props.refreshFunction(newImages)   //image file을 올릴때 부모 UploadProductPage의 props 호출하여 삭제변경시키기
  }
  
  return (
        //  {/* npm install react-dropzone --save */}
    <div style={{display:'flex', justifyContent:'spacebetween'}}>

       {/* //react-dropzone-npm 공인 사이트에서 가겨오기  */}
      <Dropzone onDrop={dropHandler}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div  style={{
                  width:300, height:240, border:'1px solid lightgray',
                  display:'flex', alignItems:'center', justifyContent:'center'
            }}
            
              {...getRootProps()}>
              <input {...getInputProps()} />
              <Icon type="plus" style={{fontSize:'3rem'}} ></Icon>
            </div>
          </section>
        )}
      </Dropzone>

            {/* //파일올리면 파일 렌더링 , 파일이 아오게 */}

            <div style={{display:'flex', width:'350px',height:'240px',overflow:'scroll', border:'1px solid blue', marginLeft:'1rem'}}>
              
              {Images.map((image,index) => (   
                  <div onClick={()=>deleteHandler(image)} key={index}>       {/* image index받기위해 image넣기 */}
                    <img style={{minWidth:'300px',width:'300px',height:'240px', marginLeft:'.5rem'}}
                        src={`https://bensmenu.herokuapp.com/${image}`} />
                  </div>
              ) )}

            </div>
    </div>
  )
}
export default FileUpload
