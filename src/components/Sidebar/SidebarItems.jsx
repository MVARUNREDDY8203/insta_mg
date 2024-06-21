import React from "react";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
    return (
        <>
            <Home></Home>
            <Search></Search>
            <CreatePost></CreatePost>
            <Notifications></Notifications>
            <ProfileLink></ProfileLink>
        </>
    );
};

export default SidebarItems;
