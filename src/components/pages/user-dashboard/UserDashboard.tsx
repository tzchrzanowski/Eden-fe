import React, {useContext} from 'react';
import './UserDashboard.css';
import UserContext from "context/UserContext";
import TopNavigation from "components/top-navigation/TopNavigation";
import {UserCashOutInterface, UserInterface} from "object-types/user-interfaces";
import {getUser} from "data/getRequests";
import UserCashOutSidebarForm from "./user-cashout-sidebar-form/UserCashOutSidebarForm";
import {setCashOutBool} from "data/patchRequests";

const initialEmptyUser: UserCashOutInterface = {
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
    cashOut: false,
    cash_out_details: "",
}

export function UserDashboard() {
    const [fetchedUser, setFetchedUser] = React.useState<UserCashOutInterface>(initialEmptyUser);
    const contextValue = useContext(UserContext);
    const [rerender, setRerender] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const [cashOutRequested, setCashOutRequested] = React.useState<boolean>(fetchedUser.cashOut);

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

    React.useEffect(()=> {
        setCashOutRequested(fetchedUser.cashOut);
    }, [fetchedUser]);

    const fetchUserData = async (user_id: string) => {
        const fetchedUser = await getUser(user_id);
        setFetchedUser(fetchedUser);
    }


    const handleCancelCashOutRequest = async () => {
        try {
            const response = await setCashOutBool(fetchedUser.id, false);
            if (response == 200 || response == "200") {
                setCashOutRequested(false);
            }
        } catch (error) {
            console.log("Cancel cash out request by user error: ", error);
        }
    }

    return (
      <>
          <TopNavigation />
          <UserCashOutSidebarForm
              user={fetchedUser}
              isOpen={sidebarOpen}
              rerenderDashboard={setRerender}
              setSidebarOpen={setSidebarOpen}
          />
          <div className={loading ? "justify-center profile-dashboard-wrapper" : "profile-dashboard-wrapper"}>
              {loading && (<div><span>Loading...</span></div>)}
              {!loading && fetchedUser &&
                  (<>
                      <div className={"profile-photo-wrapper"}>
                          <img className={"profile-photo-wrapper"} src={fetchedUser.profile_picture_url} alt={"photo url missing"} />
                      </div>
                      <div className={"fb fb-column min-w-300"}>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>Username: </span>
                                  <span><strong>{fetchedUser.username}</strong></span>
                              </div>
                          </div>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>Package type:</span>
                                  <span><strong>{fetchedUser.packageType}</strong></span>
                              </div>
                          </div>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>Full name: </span>
                                  <span><strong>{fetchedUser.first_name} {fetchedUser.last_name}</strong></span>
                              </div>
                          </div>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>email: </span>
                                  <span><strong>{fetchedUser.email}</strong></span>
                              </div>
                          </div>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>Total amount of points: </span>
                                  <span><strong>{fetchedUser.points}</strong></span>
                              </div>
                          </div>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>Amount of points this month: </span>
                                  <span><strong>{fetchedUser.monthly_points}</strong></span>
                              </div>
                          </div>
                          <div className={"mt-3 form-item-caption bw b-1 bb-solid"}>
                              <div className={"fb fb-row fb-justify-space-between"}>
                                  <span>Amount of money: </span>
                                  <span><strong>{fetchedUser.money_amount} php</strong></span>
                              </div>
                          </div>

                          {cashOutRequested &&
                              <>
                                  <div className={"mt-3 form-item-caption bw b-1 bb-solid warning-message"}>
                                      <div className={"fb fb-row fb-justify-space-between"}>
                                          <span>Cash out requested: </span>
                                          <span>Yes</span>
                                      </div>
                                  </div>
                                  <div className={"mt-3 form-item-caption bw b-1 bb-solid warning-message"}>
                                      <div className={"fb fb-column fb-justify-space-between"}>
                                          <span>Cash out details: </span>
                                          <span><strong>{fetchedUser.cash_out_details}</strong></span>
                                      </div>
                                  </div>
                              </>
                          }
                      </div>
                      <button className={"node-caption mt-3 pointer"} onClick={()=>setSidebarOpen((prevState) => !prevState)}>Request cash out</button>
                      {cashOutRequested &&
                          <button className={"node-caption mt-3 pointer"} onClick={()=>handleCancelCashOutRequest()}>Cancel cash out request</button>
                      }
                  </>)
              }
          </div>
      </>
    );
}

export default UserDashboard;
