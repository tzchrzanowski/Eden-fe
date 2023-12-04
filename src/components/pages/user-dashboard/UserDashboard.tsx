import React, {useContext} from 'react';
import './UserDashboard.css';
import UserContext from "context/UserContext";
import TopNavigation from "components/top-navigation/TopNavigation";
import {User, UserInterface} from "object-types/user-interfaces";
import {getUser} from "data/getRequests";

const initialEmptyUser: UserInterface = {
    email: "",
    first_name: "",
    id: -1,
    last_name: "",
    left_child: -1,
    right_child: -1,
    parent: -1,
    profile_picture_url: "",
    username: "",
    points: -1,
    monthly_points: -1,
    packageType: "",
    money_amount: -1,
    direct_referral: -1,
}

export function UserDashboard() {
    const [fetchedUser, setFetchedUser] = React.useState<UserInterface>(initialEmptyUser);
    const contextValue = useContext(UserContext);
    const [rerender, setRerender] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(()=> {
        if (contextValue?.state?.user) {
            if (contextValue.state.user.user_photo) {
                fetchUserData(contextValue.state.user.user_id)
                    .then(()=>setLoading(false));
            }
        }
    }, [contextValue]);

    React.useEffect(()=> {
        if (contextValue?.state?.user) {
            if (contextValue.state.user.user_photo) {
                fetchUserData(contextValue.state.user.user_id)
                    .then(()=>setLoading(false));
            }
        }
    }, [rerender]);

    const fetchUserData = async (user_id: string) => {
        const fetchedUser = await getUser(user_id);
        setFetchedUser(fetchedUser);
    }

    return (
      <>
          <TopNavigation />
          <div className={loading ? "justify-center profile-dashboard-wrapper" : "profile-dashboard-wrapper"}>
              {loading && (<div><span>Loading...</span></div>)}
              {!loading && fetchedUser &&
                  (<>
                      <div className={"profile-photo-wrapper"}>
                          <img className={"profile-photo-wrapper"} src={fetchedUser.profile_picture_url} alt={"photo url missing"} />
                      </div>
                      <div className={"fb fb-column"}>
                          <div className={"mt-3 form-item-caption"}>
                              <span>Username: <strong>{fetchedUser.username}</strong></span>
                          </div>
                          <div className={"mt-3 form-item-caption"}>
                              <span>Amount of money: <strong>{fetchedUser.packageType} php</strong></span>
                          </div>
                          <div className={"mt-3 form-item-caption"}>
                              <span>Full name: <strong>{fetchedUser.first_name} {fetchedUser.last_name}</strong></span>
                          </div>
                          <div className={"mt-3 form-item-caption"}>
                              <span>email: <strong>{fetchedUser.email}</strong></span>
                          </div>
                          <div className={"mt-3 form-item-caption"}>
                              <span>Total amount of points: <strong>{fetchedUser.points}</strong></span>
                          </div>
                          <div className={"mt-3 form-item-caption"}>
                              <span>Amount of points this month to collect: <strong>{fetchedUser.monthly_points}</strong></span>
                          </div>
                          <div className={"mt-3 form-item-caption"}>
                              <span>Amount of money: <strong>{fetchedUser.money_amount} php</strong></span>
                          </div>
                      </div>
                  </>)
              }
          </div>
      </>
    );
}

export default UserDashboard;
