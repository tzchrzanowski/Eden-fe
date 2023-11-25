import './UsersList.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import React, {useContext} from "react";
import {UserInterface, UserNodeSimpleInfo} from "object-types/user-interfaces";
import UserContext from "context/UserContext";
import {getAllUsers} from "data/getRequests";
import SidebarUserPointsForm from "./sidebar-user-points-form/SidebarUserPointsForm";
import addPointsIcon from "resources/side-nav-icons/add-points-icon.svg";

const initialEmptyUser = {
    user_id: -1,
    full_name: "",
    email: "",
    profile_picture_url: "",
    username: "",
    points: 0,
    packageType: "",
    money_amount: 0,
}

export function UsersList() {
    const [fetchedAllUsers, setFetchedAllUsers] = React.useState<UserInterface[] | null>(null);
    const [isSidebarAddPointsOpen, setSidebarAddPointsOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState<UserNodeSimpleInfo>(initialEmptyUser);
    React.useEffect(()=>{
        fetchData();
    }, []);

    const handleRowClick = (user: UserInterface): void => {
        setSelectedUser({
            user_id: user.id,
            full_name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            profile_picture_url: user.profile_picture_url,
            username: user.username,
            points: user.points,
            packageType: user.packageType,
            money_amount: user.money_amount,
        });
        setSidebarAddPointsOpen(true)
    }

    const fetchData = async () => {
        const fetchedUsers = await getAllUsers();
        setFetchedAllUsers(fetchedUsers)
    }

    return (
        <div className={"fb fb-column justify-center align-center align-items-center"}>
            <TopNavigation />
            <SidebarUserPointsForm
                user={selectedUser}
                isOpen={isSidebarAddPointsOpen}
                setSidebarPointsFormOpenCallback={setSidebarAddPointsOpen}
            />
            <div className={"users-list-page-content"}>
                <table className={"mt-5"} style={{ borderCollapse: 'collapse', width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', minWidth: '60px', textAlign: 'left', verticalAlign: 'middle' }}></th>
                            <th style={{ width: '22%', minWidth: '100px', textAlign: 'left', verticalAlign: 'middle' }}>Username</th>
                            <th style={{ width: '5%', minWidth: '70px', textAlign: 'left', verticalAlign: 'middle' }}>Points</th>
                            <th style={{ width: '13%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Money Amount</th>
                            <th style={{ width: '20%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Full Name</th>
                            <th style={{ width: '40%', minWidth: '220px', textAlign: 'left', verticalAlign: 'middle' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fetchedAllUsers && fetchedAllUsers.map((user, id) => (
                            <tr key={id} onClick={()=>handleRowClick(user)} >
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        <img
                                            className={"category-icon"}
                                            src={addPointsIcon}
                                            alt={"add points"}
                                            onClick={()=>handleRowClick(user)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        {user.username}
                                    </div>
                                </td>
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        {user.points}
                                    </div>
                                </td>
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        {user.money_amount}
                                    </div>
                                </td>
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        {user.first_name} {user.last_name}
                                    </div>
                                </td>
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        {user.email}
                                    </div>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersList;
