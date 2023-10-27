// import { Link, NavLink } from 'react-router-dom'

import { useContext, useState } from 'react';

import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserProvider';
import logo from './../assets/images/logo.jpg';

// import Nav from 'react-bootstrap/esm/Nav'
// import { Navbar } from 'react-bootstrap'




export default function Sidebar() {

  const { user } = useContext(UserContext)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <div className="navbar-brand">
          <img className='rounded-circle' src={logo} alt='snap taxi' />
        </div>
        {
          user.token && (
            <button onClick={() => setIsNavbarOpen(prevState => !prevState)} className={`navbar-toggler ${!isNavbarOpen ? 'collapsed' : ''}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded={`${isNavbarOpen ? "true" : "false"}`} aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
          )
        }
        <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarResponsive">
          <ul className="navbar-nav w-100">
            {
              user.token && (
                <>
                  <li className="nav-item">
                    <Link onClick={() => setIsNavbarOpen(false)} to='/' className="nav-link" >Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link  onClick={() => setIsNavbarOpen(false)} to={`/user/${user.username}`} className="nav-link" >My Page</Link>
                  </li>
                  <li className="nav-item">
                    <Link onClick={() => setIsNavbarOpen(false)} to='/users' className="nav-link" >Other Passengers</Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to='/feed' className="nav-link" >Posts</Link>
                  </li> */}
                  <li className="nav-item">
                    <Link onClick={() => setIsNavbarOpen(false)} to='/country' className="nav-link" >Country (API)</Link>
                  </li>
                </>
              )
            }
            {
              user.token && (
                <li className="nav-item d-flex align-items-end ms-auto">
                  <Link  onClick={() => setIsNavbarOpen(false)} to='/logout' className=" btn btn-outline-light" >Logout</Link>
                </li>
              )
            }
          </ul>
        </div>
      </nav>
    </>
    // <Navbar sticky='top' className='flex-column sidebar'>
    //   <Nav.Item>
    //     <Nav.Link as={NavLink} to='/'>Matrix Page</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link as={NavLink} to={`/user/${user.username}`}>My Page</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link as={NavLink} to='/users'>All Users</Nav.Link>
    //   </Nav.Item>
    //   <Nav.Item>
    //     <Nav.Link as={NavLink} to='/feed'>Posts</Nav.Link>
    //   </Nav.Item>
    // </Navbar>
  )
}
