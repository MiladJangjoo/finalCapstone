import { useNavigate, useParams } from "react-router-dom"
// import Posts from "../components/Posts"
import UserForm from "../components/forms/UserForm"
import { Spinner } from "react-bootstrap"
import DeleteForm from "../components/forms/DeleteForm"
import Trips from "../components/Trips"
import { useContext, useEffect, useState } from "react"
import { Toast } from "../components/Toast"
import { UserProfileDetailsType } from "../types"
import { UserContext } from "../contexts/UserProvider"
import { apiRoot } from "../app.config"
import jwt_decode from "jwt-decode";

export default function UserPage() {
  const [pageLoading, setPageLoading] = useState(true)
  const [userProfileDetails, setUserProfileDetails] = useState<UserProfileDetailsType>({} as UserProfileDetailsType)
  const navigate = useNavigate();
  const { username } = useParams()
  const { user } = useContext(UserContext)
  // sub equals to passenger_id
  const { sub } = jwt_decode(user.token) as { sub: number };

  useEffect(() => {
    getUserByID()
  }, [])



  async function getUserByID() {
    const res = await fetch(`${apiRoot}/passenger/${sub}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token!}`
      },
      // body: JSON.stringify(formUserDetails)
    })

    const data = await res.json()
    setUserProfileDetails(data)
    setPageLoading(false)
    if (res.status === 401) {
      // 401 Unauthorized
      Toast('error', 'For the security of your account, please login again.')
      navigate('/logout')
    }
  }
  return (
    <>
      <h3 className="text-capitalize">{username}'s Page</h3>
      {(!username || pageLoading) ? (
        <Spinner className='mx-auto' />
      ) : (
        <div>
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="edit-profile-tab" data-bs-toggle="tab" data-bs-target="#edit-profile" type="button" role="tab" aria-controls="edit-profile" aria-selected="true">Edit Profile</button>
              <button className="nav-link" id="my-trips-tab" data-bs-toggle="tab" data-bs-target="#my-trips" type="button" role="tab" aria-controls="my-trips" aria-selected="false">My Trips</button>
              <button className="nav-link" id="delete-account-tab" data-bs-toggle="tab" data-bs-target="#delete-account" type="button" role="tab" aria-controls="delete-account" aria-selected="false">Delete Account</button>
            </div>
          </nav>
          <div className="tab-content pt-4" id="nav-tabContent">
            <div className="tab-pane fade show active" id="edit-profile" role="tabpanel" aria-labelledby="edit-profile-tab" tabIndex={0}><UserForm edit userProfileDetails={userProfileDetails} /></div>
            <div className="tab-pane fade" id="my-trips" role="tabpanel" aria-labelledby="my-trips-tab" tabIndex={0}><Trips userTrips={userProfileDetails.requests} /></div>
            <div className="tab-pane fade" id="delete-account" role="tabpanel" aria-labelledby="delete-account-tab" tabIndex={0}><DeleteForm /></div>

          </div>
        </div>
      )
      }
    </>
  )
}
