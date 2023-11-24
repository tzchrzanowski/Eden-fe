import './UsersList.css';
import TopNavigation from "components/top-navigation/TopNavigation";
import React, {useContext} from "react";
import {UserInterface} from "object-types/user-interfaces";
import UserContext from "context/UserContext";
import {getAllUsers} from "data/getRequests";

export function UsersList() {
    const [fetchedAllUsers, setFetchedAllUsers] = React.useState<UserInterface[] | null>(null);
    const contextValue = useContext(UserContext);

    React.useEffect(()=>{
        fetchData();
    }, []);

    const fetchData = async () => {
        const fetchedUsers = await getAllUsers();
        setFetchedAllUsers(fetchedUsers)
    }

    return (
        <div className={"fb fb-column justify-center align-center align-items-center"}>
            <TopNavigation />
            <div className={"users-list-page-content"}>
                <table className={"mt-5"} style={{ borderCollapse: 'collapse', width: '100%'}}>
                    <thead>
                        <tr>
                            <th style={{ width: '20%', textAlign: 'left', verticalAlign: 'middle' }}>Username</th>
                            <th style={{ width: '40%', minWidth: '220px', textAlign: 'left', verticalAlign: 'middle' }}>Email</th>
                            <th style={{ width: '20%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Full Name</th>
                            <th style={{ width: '15%', minWidth: '150px', textAlign: 'left', verticalAlign: 'middle' }}>Money Amount</th>
                            <th style={{ width: '5%', textAlign: 'left', verticalAlign: 'middle' }}>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                    {fetchedAllUsers && fetchedAllUsers.map((user, id) => (
                        <tr key={id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.money_amount}</td>
                            <td>{user.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersList;
