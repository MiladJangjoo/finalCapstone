import { FormEvent, useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDetailsType, UserProfileDetailsType } from '../../types'

import InputComponent from '../InputComponent'
import { Spinner } from 'react-bootstrap'
import { Toast } from '../Toast'
import { UserContext } from '../../contexts/UserProvider'
import { apiRoot } from '../../app.config'

type userFormProps = {
  edit: false;
} | {
  edit: true;
  userProfileDetails: UserProfileDetailsType;
}


export default function UserForm(props: userFormProps) {

  const navigate = useNavigate()
  const usernameField = useRef<HTMLInputElement>(null)
  const emailField = useRef<HTMLInputElement>(null)
  const passwordField = useRef<HTMLInputElement>(null)
  const newPasswordField = useRef<HTMLInputElement>(null)
  const phoneNumberField = useRef<HTMLInputElement>(null)
  const fNameField = useRef<HTMLInputElement>(null)
  const lNameField = useRef<HTMLInputElement>(null)
  const { user } = useContext(UserContext)
  const [pageLoading, setPageLoading] = useState(false)

  useEffect(() => {

    if (props.edit) {
      if (!user.token) {
        return navigate('/')
      }
    }
  }, [])


  async function handleRegisterData(e: FormEvent<HTMLElement>) {
    e.preventDefault()
    if (usernameField.current?.value && phoneNumberField.current?.value && emailField.current?.value && passwordField.current?.value) {
      const formUserDetails: UserDetailsType = {
        username: usernameField.current!.value,
        password: passwordField.current!.value,
        email: emailField.current!.value,
        phone_number: phoneNumberField.current!.value,
      }
      if (!props.edit) {
        formUserDetails.password = passwordField.current!.value
      }
      if (fNameField.current!.value) {
        formUserDetails.first_name = fNameField.current?.value
      }
      if (lNameField.current!.value) {
        formUserDetails.last_name = lNameField.current?.value
      }
      if (props.edit) {
        formUserDetails.new_password = newPasswordField.current?.value
      }
      await registerUser(formUserDetails)
    } else {
      Toast('error', 'Please fill in all of required fields.')
    }
  }


  async function registerUser(formUserDetails: UserDetailsType) {
    const endpoint = props.edit ? 'passenger' : 'passengerregister'
    setPageLoading(true);
    const res = await fetch(`${apiRoot}/${endpoint}`, {
      method: props.edit ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token!}`
      },
      body: JSON.stringify(formUserDetails)
    })
    setPageLoading(false);
    const data = await res.json()
    console.log(data)
    if (res.ok) {
      if (props.edit) {
        Toast('success', 'Editing was done successfully.')
      } else {
        Toast('success', 'Registration was done successfully.')
        navigate('/login')
      }
    } else if (res.status === 401) {
      // 401 Unauthorized
      Toast('error', 'For the security of your account, please login again.')
      navigate('/logout')
    } else {
      // clearFormData()
      Toast('error', 'An error occurred, please try again.')

    }
  }

  // function clearFormData() {
  //   usernameField.current!.value = ''
  //   emailField.current!.value = ''
  //   passwordField.current!.value = ''
  //   phoneNumberField.current!.value = ''
  //   fNameField.current!.value = ''
  //   lNameField.current!.value = ''
  // }

  return (
    <>
      <form className="row g-3" onSubmit={handleRegisterData}>
        {
          (!props.edit || props.userProfileDetails.id) ? (
            <>
              <div className="col-md-4">
                <InputComponent name='email' type='email' {...(props.edit && { defaultValue: props.userProfileDetails.email || '' })} ref={emailField} required />
              </div>
              <div className="col-md-4">
                <InputComponent name='username' type='text' {...(props.edit && { defaultValue: props.userProfileDetails.username || '' })} ref={usernameField} required />
              </div>
              <div className="col-md-4">
                <InputComponent name='phone_number' type='text' {...(props.edit && { defaultValue: props.userProfileDetails.phone_number || '' })} ref={phoneNumberField} required />
              </div>
              <div className="col-md-4">
                <InputComponent name='first_name' type='text' {...(props.edit && { defaultValue: props.userProfileDetails.first_name || '' })} ref={fNameField} />
              </div>
              <div className="col-md-4">
                <InputComponent name='last_name' type='text' {...(props.edit && { defaultValue: props.userProfileDetails.last_name || '' })} ref={lNameField} />
              </div>
              <div className="col-md-4">
                <InputComponent name='password' type='password' ref={passwordField}  required />
              </div>

              {
                props.edit && (
                  <div className="col-md-4">
                    <InputComponent name='new_password' type='password' ref={newPasswordField} />
                  </div>
                )
              }


              <div className="col-12">
                <button className="btn btn-primary" type="submit" {...(pageLoading && { disabled: true })}>
                  {
                    pageLoading ? (
                      <div>
                        <span className="spinner-border spinner-border-sm me-1" aria-hidden="true" />
                        <span role="status">Loading...</span>
                      </div>

                    ) : props.edit ? 'Edit' : 'Register'
                  }
                </button>
              </div>
            </>
          ) : (
            <Spinner className='mx-auto mt-5' />
          )
        }

        {
          !props.edit && (
            <p>You've Registered Before? <Link to='/login' className="text-primary" >Login!</Link></p>
          )
        }
      </form>

      {/* <form onSubmit={handleRegisterData}>
        <label htmlFor="username">Username</label><br />
        <input type="text" name='username' ref={usernameField} required /><br />
        <label htmlFor="email">Email</label><br />
        <input type="text" name='email' ref={emailField} required /><br />
        <label htmlFor="first_name">First Name</label><br />
        <input type="text" name='first_name' ref={fNameField} /><br />
        <label htmlFor="last_name">LastName</label><br />
        <input type="text" name='last_name' ref={lNameField} /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" name='password' ref={passwordField} required /><br />
        <input type="submit" value={props.edit ? 'Edit' : 'Register'} />
      </form> */}
    </>
  );
}
