import './UsersList.css';
import TopNavigation from "../../top-navigation/TopNavigation";
import React from "react";

export function UsersList() {
    return (
        <div className={"fb fb-column justify-center align-center align-items-center"}>
            <TopNavigation />
            <div className={"users-list-page-content"}>
                List of users
            </div>
        </div>
    );
}

export default UsersList;
