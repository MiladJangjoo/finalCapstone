import { useEffect, useState } from 'react';

import { Spinner } from 'react-bootstrap';
import { Toast } from '../components/Toast';
import { UserDetailsType } from '../types';
import { apiRoot } from '../app.config';
import { useNavigate } from 'react-router-dom';

export default function Users() {
  const [users, setUsers] = useState<Array<Partial<UserDetailsType>>>([]);
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    getUsers();
  }, []);
  const navigate = useNavigate()

  async function getUsers() {
    const res = await fetch(`${apiRoot}/passenger`);
    if (res.ok) {
      const data = await res.json();
      setUsers(data);
      setPageLoading(false)
    } else if (res.status === 401) {
      // 401 Unauthorized
      Toast('error', 'For the security of your account, please login again.')
      navigate('/logout')
    } else {
      Toast('error', 'An error occurred, please try again.')
      console.log('bad request')
    }
  }


  return (
    <>
      <h3>Other Passengers</h3>
      {
        pageLoading ? (
          <Spinner className="mx-auto" />
        ) : (
          <div className='table-responsive'>
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Number</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.length > 0 ? (users.map((user: Partial<UserDetailsType>, i: number) => (
                    <tr>
                      <th>{i + 1}</th>
                      <td>{user.first_name || '-'}</td>
                      <td>{user.last_name || '-'}</td>
                      <td>{user.username}</td>
                      <td>{user.phone_number}</td>
                    </tr>
                  )
                  )) : (
                    <tr>
                      <th colSpan={6}>There is no users yet.</th>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        )}
    </>
  );
}
