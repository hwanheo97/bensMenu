import React, { useState } from 'react'
import { Collapse,Checkbox } from 'antd'

const {Panel}  = Collapse;

function CheckBox(props) {
    //  _id 를 check하면 state화  [1,2,..]
    const [Checked,setChecked] =useState([])

    const handleToggle = (value) => {
        //누른 것의 index를 구하고
        const currentIndex = Checked.indexOf(value)
        //전체 Checked 된 State에서 현재누른 Checkbox 가 이미 있다면, spread operator syntax [...Checked]
        const newChecked = [...Checked]
        //-1 = 없으면 State 넣어준다,=> 클릭시 V 표시됨
        if(currentIndex === -1){
            newChecked.push(value)
            //넣어주고 => 클릭시 V 표시됨
        }else{
            //이미 있으면 지워주기
            newChecked.splice(currentIndex,1)
        }
        setChecked(newChecked)
        //newChecked 셋후 부모 component LandingPage에 연결
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value,index) =>(
        <React.Fragment key={index}>
            <Checkbox onChange={()=>handleToggle(value._id)} 
                checked={Checked.indexOf(value._id)=== -1 ? false : true}  > 
                <span style={{marginRight:'1rem'}}>{value.name}</span>
            </Checkbox>
        </React.Fragment>
    ))
  return (
    <div>
        <Collapse defaultActiveKey={['0']} >
             <Panel header="메뉴" key="1">  
               {renderCheckboxLists()}
            </Panel>
        </Collapse>
    </div>
  )
}

export default CheckBox
