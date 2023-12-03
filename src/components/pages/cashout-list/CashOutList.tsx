import './CashOutList.css';
import React from 'react';
import TopNavigation from "components/top-navigation/TopNavigation";
import {CashOutUserInfo, UserInterface} from "object-types/user-interfaces";
import {getAllCashOutUsers} from "data/getRequests";
import CashOutIcon from "resources/side-nav-icons/cash-out-icon.svg";

const initialEmptyUser = {
    user_id: -1,
    full_name: "",
    email: "",
    profile_picture_url: "",
    username: "",
    money_amount: 0,
}
export function CashOutList() {
    const [fetchedAllCashOutUsers, setFetchedAllCashOutUsers] = React.useState<UserInterface[] | null>(null);
    const [searchTerm, setSearchTerm] = React.useState<string>('');
    const [selectedUser, setSelectedUser] = React.useState<CashOutUserInfo>(initialEmptyUser);
    const [isSidebarCashOutUserOpen, setSidebarCashOutUserOpen] = React.useState<boolean>(false);

    const [rerender, setRerender] = React.useState<boolean>(false);
    const filteredUsers = fetchedAllCashOutUsers
        ? fetchedAllCashOutUsers.filter((user: UserInterface) =>
            `${user.username} ${user.points} ${user.direct_referral} ${user.money_amount} ${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
        : [];

    React.useEffect(() => {
        initialFetchCashOutUsers();
    }, [rerender]);

    const initialFetchCashOutUsers = async () => {
        const fetchedData = await getAllCashOutUsers();
        setFetchedAllCashOutUsers(fetchedData);
    }



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
            money_amount: user.money_amount,
        });
        setSidebarCashOutUserOpen(true);
    }

    return (
        <div className={"fb fb-column justify-center align-center align-items-center"}>
            <TopNavigation />
            <div className={"mt-10vh"}>
                <div className={"fb fb-row mt-5"}>
                    <label>
                        <span>Search user:</span>
                        <input className={"ml-2"} type="text" value={searchTerm} onChange={handleSearchChange} />
                    </label>
                </div>
                <table className={"mt-5"} style={{ borderCollapse: 'collapse', width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{ width: '5%', minWidth: '40px', textAlign: 'left', verticalAlign: 'middle' }}>#</th>
                            <th style={{ width: '22%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Username</th>
                            <th style={{ width: '13%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Total money</th>
                            <th style={{ width: '20%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Full Name</th>
                            <th style={{ width: '40%', minWidth: '220px', textAlign: 'left', verticalAlign: 'middle' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredUsers && filteredUsers.map((user: UserInterface, id: number) => (
                        <tr key={id} onClick={()=> handleRowClick(user)}>
                            <td>
                                <div className={"cash-out-users-row fb align-items-center"}>
                                    <img
                                        src={CashOutIcon}
                                        alt={"cash out"}
                                        onClick={()=>handleRowClick(user)}
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={"cash-out-users-row fb align-items-center"}>
                                    {user.username}
                                </div>
                            </td>
                            <td>
                                <div className={"cash-out-users-row fb align-items-center"}>
                                    {user.money_amount}
                                </div>
                            </td>
                            <td>
                                <div className={"cash-out-users-row fb align-items-center"}>
                                    {user.first_name} {user.last_name}
                                </div>
                            </td>
                            <td>
                                <div className={"cash-out-users-row fb align-items-center"}>
                                    {user.email}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CashOutList;
