// import Container from 'react-bootstrap/esm/Container'

import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { UserContext } from '../contexts/UserProvider'
import { useContext } from 'react'

// import Stack from 'react-bootstrap/esm/Stack'

interface BodyProps {
  sidebar?: boolean
  children?: JSX.Element[] | JSX.Element
}

export default function Body({ sidebar, children }: BodyProps) {
  const { user } = useContext(UserContext)

  return (
    <>
      {/* Start Home Section */}
      < div id="home" >
        {/* Navigation */}
        {sidebar && <Sidebar />}
        {/* End Navigation */}
        {/* Start Landing Page Section */}
        <div className="landing">
          <div className="home-wrap">
            <div className="home-inner" />
          </div>
        </div>
        <div className="caption text-center">
          {
            children ? (
              <div className="card shadow col-lg-9 col-md-10 col-sm-11 mx-auto">
                {children}
              </div>
            ) : (
              <>
                <h1>Welcome to Snap</h1>
                <h3 className='text-capitalize'>{user.username}</h3>
                {
                  !user.token ? (
                    <Link className="btn btn-outline-light btn-lg rounded-1 " to='/login'>Signing</Link>
                  ) : (
                    <Link className="btn btn-outline-light btn-lg rounded-1 " to='/logout'>Logout</Link>
                  )
                }
              </>
            )
          }

        </div>
      </div>   {/* End Landing Page Section */}

      {/* End Home Section */}

      {/* < Container >
    <Stack direction='horizontal'>
      {sidebar && <Sidebar />}
      <div className='child-container'>
        {children}
      </div>
    </Stack> */}
    </>
  )
}
