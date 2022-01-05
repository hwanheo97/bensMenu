import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">Home</a>
    </Menu.Item>
    <SubMenu title={<span>뉴앱</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1"><a href="https://sttrimming.herokuapp.com">위치정보주기</a>  </Menu.Item>
        <Menu.Item key="setting:2"><a href="https://swtrimming.com/logistic/">위치정보받기</a>  </Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3"><a href="/">쇼핑몰 BenMenu</a>  </Menu.Item>
        <Menu.Item key="setting:4"><a href="/">쇼핑몰 comming soon</a> </Menu.Item>
      </MenuItemGroup>
    </SubMenu>
  </Menu>
  )
}

export default LeftMenu