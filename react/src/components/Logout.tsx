import { useContext, useEffect } from 'react'

import Spinner from 'react-bootstrap/Spinner'
import { UserContext } from '../contexts/UserProvider'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    setUser({username: '', token: ''})
    navigate('/')
  },[])


  return <Spinner />
}
