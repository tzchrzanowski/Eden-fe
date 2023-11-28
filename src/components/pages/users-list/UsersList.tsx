import './UsersList.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import React, {useContext} from "react";
import {UserInterface, UserNodeSimpleInfo} from "object-types/user-interfaces";
import {getAllUsers} from "data/getRequests";
import SidebarUserPointsForm from "./sidebar-user-points-form/SidebarUserPointsForm";
import addPointsIcon from "resources/side-nav-icons/add-points-icon.svg";
import SidebarMonthlyPointsForm from "./sidebar-monthly-points-form/SidebarMonthlyPointsForm";

const initialEmptyUser = {
    user_id: -1,
    full_name: "",
    email: "",
    profile_picture_url: "",
    username: "",
    points: 0,
    monthly_points: 0,
    packageType: "",
    money_amount: 0,
    direct_referral: -1,
}

export function UsersList() {
    const [fetchedAllUsers, setFetchedAllUsers] = React.useState<UserInterface[] | null>(null);
    const [isSidebarAddPointsOpen, setSidebarAddPointsOpen] = React.useState<boolean>(false);
    const [isSidebarMonthlyPointsOpen, setSidebarMonthlyPointsOpen] = React.useState<boolean>(false);
    const [selectedUser, setSelectedUser] = React.useState<UserNodeSimpleInfo>(initialEmptyUser);
    const [rerender, setRerender] = React.useState<boolean>(false);
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const filteredUsers = fetchedAllUsers
        ? fetchedAllUsers.filter((user: UserInterface) =>
            `${user.username} ${user.points} ${user.direct_referral} ${user.money_amount} ${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        : [];

    React.useEffect(()=>{
        fetchData();
    }, [rerender]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

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
            direct_referral: user.direct_referral,
        });
        setSidebarMonthlyPointsOpen(false);
        setSidebarAddPointsOpen(true)
    }

    const fetchData = async () => {
        const fetchedUsers = await getAllUsers();
        setFetchedAllUsers(fetchedUsers)
    }

    const openMonthPointsForm = (): void => {
        setSidebarAddPointsOpen(false);
        setSidebarMonthlyPointsOpen(true);
    }

    return (
        <div className={"fb fb-column justify-center align-center align-items-center"}>
            <TopNavigation />
            <SidebarUserPointsForm
                user={selectedUser}
                isOpen={isSidebarAddPointsOpen}
                setSidebarPointsFormOpenCallback={setSidebarAddPointsOpen}
                rerenderListCallback={setRerender}
            />
            <SidebarMonthlyPointsForm
                isOpen={isSidebarMonthlyPointsOpen}
                setSidebarMonthlyPointsFormOpenCallback={setSidebarMonthlyPointsOpen}
                rerenderListCallback={setRerender}
            />
            <div className={"users-list-page-content"}>
                <div className={"fb fb-row"}>
                    <div className={"mt-5"} >
                        <label>
                            <span>Search user:</span>
                            <input className={"ml-2"} type="text" value={searchTerm} onChange={handleSearchChange} />
                        </label>
                    </div>
                    <div
                        className={"ml-7 mt-5 fb align-items-center pointer"}
                        onClick={()=>openMonthPointsForm()}
                    >
                        <img
                            src={addPointsIcon}
                            alt={"add points"}
                            onClick={()=>openMonthPointsForm()}
                        />
                        <div className={"ml-2 pointer"}>
                            <span>Add monthly points</span>
                        </div>
                    </div>
                </div>
                <table className={"mt-5"} style={{ borderCollapse: 'collapse', width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', minWidth: '40px', textAlign: 'left', verticalAlign: 'middle' }}>#</th>
                            <th style={{ width: '22%', minWidth: '100px', textAlign: 'left', verticalAlign: 'middle' }}>Username</th>
                            <th style={{ width: '5%', minWidth: '70px', textAlign: 'left', verticalAlign: 'middle' }}>Points</th>
                            <th style={{ width: '5%', minWidth: '70px', textAlign: 'left', verticalAlign: 'middle' }}>Monthly Points</th>
                            <th style={{ width: '13%', minWidth: '100px', textAlign: 'left', verticalAlign: 'middle' }}>Direct referral</th>
                            <th style={{ width: '13%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Money Amount</th>
                            <th style={{ width: '20%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Full Name</th>
                            <th style={{ width: '40%', minWidth: '220px', textAlign: 'left', verticalAlign: 'middle' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers && filteredUsers.map((user: UserInterface, id: number) => (
                            <tr key={id} onClick={()=>handleRowClick(user)} >
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        <img
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
                                        {user.monthly_points}
                                    </div>
                                </td>
                                <td>
                                    <div className={"users-row fb align-items-center"}>
                                        {user.direct_referral}
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
