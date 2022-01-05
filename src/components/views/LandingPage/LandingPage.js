import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import axios from "axios";
import {Icon,Col,Card,Row,Carousel} from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { countries,price } from './Sections/Datas';

function LandingPage() {

    const [Products, setProducts]  =  useState([])
    const [Skip,setSkip] = useState(0)
    const [Limit,setLimit] = useState(4)     // 4만 가겨오기
    const [PostSize,setPostSize] = useState(0)
    //Filters  두개의 배열로 초기 state
    const [Filters,setFilters] = useState({
        countries:[],
        price: []
    })
    const [SearchTerm,setSearchTerm]  = useState("")

    useEffect(() => {
       //rendering 이후 처리할 작업을 사용 용도 => DB에서 data를 가져온후 state화 하고 렌더링
       //body에 넣어 request로 같이 보내기, 데이터베이스에서 정보를 갖고오기
        let body = {
            skip:Skip,
            limit:Limit
        }
        //함수화 하여 호출
        getProducts(body)   
    },[])

    const getProducts = (body) =>{
        axios.post('https://bensmenu.herokuapp.com/api/product/products',body)  // routes/product.js 에서 처리후 받기,
        // 백엔드와 프런트엔드랑 통신을 쉽게 사용하기위해 사용하는 HTTP 비동기 통신 라이브러리
            .then(response =>{
                if(response.data.success){
                   // console.log('api/product/products',response.data)
                      //원래있는 product를 모두 넣고 , 추가의미
                   if(body.loadMore){
                    setProducts([...Products, ...response.data.productInfo]) 
                   }else{
                    setProducts(response.data.productInfo)
                   }
                    setPostSize(response.data.postSize)
                }else{
                    alert("상품들을 가져오는데 실패 했습니다.")
                }
            })
    }

    //더보기 버튼 이벤트
     const loadMoreHandler = () => {
        //더보기 버튼 누르면 0 + 8 그 다음 8 + 8
        let skip = Skip + Limit
            //  loadMore:true  더보기 눌렀을때 정보 추가하여 보내기
        let body = {
            skip:skip,
            limit:Limit,
            loadMore:true
        }
        //호출
        getProducts(body)
        //증가되는 skip setState
        setSkip(skip)
    }

    const renderCards = Products.map((product,index) => {
        console.log('rendercards-product',product)  //, row 크기 24, column 큰화면 6 x4개사진, 중간화면 8 x3개, 작은 화면 24개
        //사진 여러장 돌리기 구현 위 해 InageSlider 자식 컴포넌트 만들기
           return  <Col lg={6} md={8} xs={24} key={index}>     
                        <Card
                            cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
                            // a link 에 상품의 고유 id ${product._id} 로 href
                            >
                            <Meta
                                title={product.title}
                                description={`$${product.price}`}
                            ></Meta>
                        </Card>
                    </Col>
    })  

    const handlePrice = (value) =>{
        const data = price;
        let array = [];
        //key  = 0,1,2,...
        for(let key in data){
               if(data[key]._id === parseInt(value,10)){
              //dada.js의 array,[0,199]등  , 클릭한 값과 같다면   
                array = data[key].array;      //같은 _id의 array  
            }
        }
        return array;
    }

    const showFilteredResults = (filters)  => {
        let body = {
            //첵크박스 클릭시 db 에서 처음으로 값 가져오기 skip:0(처음 부터 가져오기), Limit은 초기화 값 8 그대로
            skip:0,
            limit:Limit,
            filters:filters
        }
        //더보기 클릭시와 같이 관련값(upload된 것중) 가져오기 
        getProducts(body)
        setSkip(0)
    }

    // checked된 1,2, _id 가 filters에 담김
    const handleFilters = (filters,category)  =>{
        //모든 Filters를 newFilters로 복제, category 는 continents 와 Price
        const newFilters ={...Filters}   // State에 있는 초기 Filters값 모두
               // continents 나 price 배열을 가리킴, filters = _id값 [1,2,..] 
        newFilters[category]  = filters   //예  [1,2,3]
         console.log('filters',filters)
         
           if(category ==="price"){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues  
            // priceValues [0,199]등  category = "price"
        }
        showFilteredResults(newFilters)
        setFilters(newFilters)      // continent, price 둘다표시되게
    }
    // newSearchTerm = event.currentTarget.value
    const updateSearchTerm = (newSearchTerm) =>{
          let body = {
            skip:0,
            limit:Limit,
            filters:Filters,  //state 의 Filters
            searchTerm:newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }
   
    return (
        <div style={{width:'75%', margin:'3rem auto'}} > 
            <div style={{textAlign:'center'}}>
                     <h2> Ben's Menu {/*<Icon type="rocket"></Icon> */}</h2> 
             </div>
                {/* Filter */}
                <Row gutter = {[16,16]}>
                    <Col lg={12} xs={24}>
                        {/* 열나누기 전체 24, 큰화면 12 x 2개 반응형으로 작은화면 24x 1만 나오게 */}
                      {/* 1) CheckBox  list이름으로 continents 데이터 checkbox component에 내려주기, list =props */}
                        <CheckBox list ={countries} handleFilters={filters => handleFilters(filters,"countries")} />
                        {/* Datas.js 컾포넌트의 배열 continents 를 checkBox에 넣기 */}
                    </Col>

                    <Col lg={12} xs={24}>
                        {/* RadioBox */}
                        <RadioBox list ={price} handleFilters={filters => handleFilters(filters,"price")} />
                    </Col>
                </Row>


                {/* Search */}
                <div style={{display:'flex',justifyContent: 'flex-end',margin:'1rem auto'}}>
                    <SearchFeature refreshFunction={updateSearchTerm}  />
                    {/* props name정의 */}
                </div>


                {/* Cards ,gutter=margin 좌우간격 16 아래 간격 */}
                <Row gutter={[16,16]}>
                    {renderCards}
                </Row>
                <br/>
                {/* productInfo.length = PostSize 가 8보다 크거나 같으면 더보기 버튼 보여주기  */}
                {PostSize >= Limit &&
                    <div style={{display:'flex', justifyContent:'center'}}>
                       <button onClick={loadMoreHandler}>더보기</button>
                     </div>
                }
        </div>
    )
}
export default LandingPage
