import React from 'react'
import { Icon, Menu } from "semantic-ui-react";

function Header({ styleValue, setAccessToken }) {

  return (
      <Menu pointing secondary size="massive" className={styleValue}>
        <Menu.Item>
          <div
            className="headerTitleStyle">
            <Icon name="food" size="small" />
            TastyBoi
          </div>
        </Menu.Item>
        <Menu.Item position='right'
          onClick={() => setAccessToken("")}>
          <div
            className="logoutTitleStyle">
            Logout
          </div>
          </Menu.Item>
      </Menu>

  )
}

export default Header;
