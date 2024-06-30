import React from "react";
import Home from "./Home";
import CreatePost from "./CreatePost";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";
import Chats from "./Chats";

const SidebarItems = () => {
    return (
        <>
            <Home></Home>
            <Search></Search>
            <CreatePost></CreatePost>
            <Chats></Chats>
            <ProfileLink></ProfileLink>
        </>
    );
};

export default SidebarItems;
