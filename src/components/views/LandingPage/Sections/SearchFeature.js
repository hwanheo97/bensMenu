import React, { useState } from 'react'
import {Input} from 'antd'

const {Search}  = Input;

function SearchFeature(props) {
   
    const [SearchTerm,setSearchTerm] = useState("")
   
    const SearchHandler = (event) =>{
        // 타이핑마다 SearchTerm state 바꿔주기
        setSearchTerm(event.currentTarget.value)  
        props.refreshFunction(event.currentTarget.value)
    }

  return (
    <div>
          <Search 
          placeholder="input search text" 
          onChange={SearchHandler} 
          style={{ width: 200 }}
          value={SearchTerm} />   
    </div>
  )
}

export default SearchFeature
