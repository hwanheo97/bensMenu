import React, { useState } from 'react'
import { Collapse,Radio } from 'antd'

const {Panel}  = Collapse
function Radiobox(props) {
    //value = _id,  _id 가 0으로 시작 
    const [Value, setValue] = useState(0)
    
    const renderRadioBox = ()  => (
        props.list && props.list.map(value => (
            <Radio key={value._id} value={value._id}>{value.name}</Radio>
        ))
    )
        //RadioBox가 클릭되면 이벤트가 발생되어 state setValue값을 변경 state해서 value={Value}가 됨=> 클릭하면 하나만 클릭됨
     const handleChange = (event) => {
            setValue(event.target.value)
            //뉴값을 부모 landingPage에 update하기
            props.handleFilters(event.target.value)
        }
  return (
    <div>
       <Collapse defaultActiveKey={['0']} >  
         <Panel header="Price" key="1">
             <Radio.Group onChange={handleChange} value={Value} >  
                     {renderRadioBox()}
            </Radio.Group>
        </Panel>
              
    </Collapse>
    </div>
  )
}

export default Radiobox
