import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { TextArea } = Input;

// step 1 UploadPage  만들기 
// const Continents = [
//     { key: 1, value: "Africa" },
//     { key: 2, value: "Europe" },
//     { key: 3, value: "Asia" },
//     { key: 4, value: "North America" },
//     { key: 5, value: "South America" },
//     { key: 6, value: "Australia" },
//     { key: 7, value: "Antarctica" }
// ]
const Countries = [
    { key: 1, value: "Korean" },
    { key: 2, value: "Western" },
    { key: 3, value: "Chinese" },
    { key: 4, value: "Japanese" },
    { key: 5, value: "Others" }
]
function UploadProductPage(props) {

    const [Title, setTitle] = useState("")    // event 발생시 setTitle 함수로 State값을 변경해 Title에 넣어 준다 => server쪽에 보낼 모든 정보들
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Country, setCountry] = useState(1)
    const [Images, setImages] = useState([])

    //event를 이용 setTitle로 Title값을 바꿔줌
    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)   // event 발생시 setTitle 함수로 State값을 변경해 Title에 넣어 준다
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const continentChangeHandler = (event) => {
        setCountry(event.currentTarget.value)
    }
    //console.log('Countrys key',Country)
    const updateImages = (newImages) => {  //Fileupload에서 올린 newImages를 받아와 UploadProductPage의 setImages로 state값 넣기
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        //모든 state값 채워야 넘어가게 설정
        if (!Title || !Description || !Price || !Country || Images.length === 0) {
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }
        //서버에 채운 값들을 request로 보낸다.
        const body = {
            //로그인 된 사람의 ID , hoc/auth.js의 자식 컴포넌트로 props가져오기
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            countries: Country
        }
        Axios.post('https://bensmenu.herokuapp.com/api/product', body)  //backend로 body의 모든 정보 보내기 =>server 쪽 index.js=> routes/product.js
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')   //성공을하면 '/' landing page경로로 보내기
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2> 상품 업로드</h2>
            </div>
            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                 <select onChange={continentChangeHandler} value={Country}>  {/*event가 일어나면 setContinent메소드로 state값 continent값이 바뀜, Country는 키값 1,2,3,4,5 */}
                    {Countries.map(item => (
                        <option key={item.key} value={item.key}> {item.value}  </option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </Form>
        </div>
    )
}
export default UploadProductPage
