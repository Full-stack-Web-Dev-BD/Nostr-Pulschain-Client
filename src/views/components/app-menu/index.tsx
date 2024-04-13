import React from "react";
import ChannelList from "views/components/app-menu/channel-list";
import DmList from "views/components/app-menu/dm-list";
import AppMenuBase from "views/components/app-menu-base";
import { useRecoilValue } from "recoil";
import { userState } from "state/userState";
import { Link } from "@reach/router";

const AppMenu = () => {
  const getUserState: any = useRecoilValue(userState);

  return (
    <AppMenuBase>
      <div className="custom_items">
        <Link to="/home">Home</Link>
        <Link to="/settings/profile">Profile</Link>
        <Link to="/settings/keys">Kays & Wallet</Link>
      </div>
      <DmList />
    </AppMenuBase>
  );
};

export default AppMenu;
