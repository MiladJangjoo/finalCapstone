import { FormEvent, useContext, useEffect, useRef, useState } from 'react'

import { UserContext } from '../../contexts/UserProvider'
import { UserDetailsType } from '../../types'
import { Link, useNavigate } from 'react-router-dom'
import { apiRoot } from '../../app.config'
import { Toast } from '../Toast'
import InputComponent from '../InputComponent'

export default function LoginForm() {
  const navigate = useNavigate()
  const { setUser, user } = useContext(UserContext)

  const usernameField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {
    if (user.token) {
      navigate('/')
    }
  }, [])

  function handleLoginData(e: FormEvent<HTMLElement>) {
    e.preventDefault()
    const loginInfo: Partial<UserDetailsType> = {
      password: passwordField.current!.value
    }
    if (usernameField.current?.value) {
      loginInfo.username = usernameField.current.value
    } else if (emailField.current?.value) {
      loginInfo.email = emailField.current.value
    } else {
      Toast('error', `Please include Username or Email'}`)
      return
    }
    loginUser(loginInfo)
  }

  async function loginUser(loginInfo: Partial<UserDetailsType>) {
    setPageLoading(true);
    const res = await fetch(`${apiRoot}/passengerlogin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginInfo)
    })
    setPageLoading(false);
    if (res.ok) {
      const data = await res.json()
      console.log("🚀 ~ file: LoginForm.tsx:51 ~ loginUser ~ res:", res)
      const accessToken = data.access_token
      setUser({
        token: accessToken,
        username: loginInfo.username ? loginInfo.username : ''
      })
      Toast('success', `Welcome ${loginInfo.username}`)
      navigate('/')
    } else if (res.status === 401) {
      // 401 Unauthorized
      Toast('error', 'For the security of your account, please login again.')
      navigate('/logout')
    } else {
      Toast('error', 'An error occurred, please try again.')
      clearFormData()
    }
  }

  function clearFormData() {
    usernameField.current!.value = ''
    emailField.current!.value = ''
    passwordField.current!.value = ''
  }

  return (
    <>
      <form className="row g-3" onSubmit={handleLoginData}>
        <div className="col-md-4">
          <InputComponent name='username' type='text' ref={usernameField} />
        </div>
        <div className="col-md-4">
          <InputComponent name='email' type='email' ref={emailField} />
        </div>
        <div className="col-md-4">
          <InputComponent name='password' type='password' ref={passwordField} />
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit" {...(pageLoading && { disabled: true })}>
            {
              pageLoading ? (
                <div>
                  <span className="spinner-border spinner-border-sm me-1" aria-hidden="true" />
                  <span role="status">Loading...</span>
                </div>

              ) : 'Login'
            }
          </button>
        </div>
      </form>
      <p>You've not Registered? <Link to='/register' className="text-primary" >Register!</Link></p>

      {/* <button type='button' onClick={() => setUser({token: "login", username: "login"})}>setUser</button> */}



      {/* <form onSubmit={handleLoginData}>
        <label htmlFor="username">Username</label><br />
        <input type="text" name='username' ref={usernameField} /><br />
        <label htmlFor="email">Email</label><br />
        <input type="text" name='email' ref={emailField} /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" name='password' ref={passwordField} required /><br />
        <input type="submit" value='Login' />
      </form> */}
    </>
  )
}
