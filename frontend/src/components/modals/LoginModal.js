import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config.json'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// TODO create helpers and cleanup
const logError = (error) => {
  if (error.response) {
    console.error(error.response.data)
  } else if (error.request) {
    console.error(error.request)
  } else {
    console.error('Error', error.message)
  }
  toast.error(`Error: ${error}`, {
    position: 'top-right',
    autoClose: 1000,
    icon: '❗️',
    theme: localStorage.theme
  })
}

const LoginModal = (props) => {
  const [password, setPassword] = useState('')
  const [isLogged, setIsLogged] = useState(localStorage.getItem('token') && localStorage.getItem('username'))
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState({
    id: null,
    username: localStorage.getItem('username'),
    email: '',
    groups: []
  })
  const [usernameIn, setUsernameIn] = useState(user.username)

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const logout = () => {
    localStorage.setItem('username', '')
    localStorage.setItem('token', '')
    props.callbackModal('login')
    toast.info('Logged out - bye, bye!', {
      position: 'top-right',
      autoClose: 1000,
      icon: '👋',
      theme: localStorage.getItem('theme')
    })
  }

  const fetchUserDetails = (username = user.username) => {
    if (user.username) {
      axios.get(`${config.url}users/${username}/`).then((res) => {
        setUser(res.data)
        setIsLogged(true)
        return true
      })
    }
    return false
  }

  const postData = () => {
    const formData = new FormData()
    formData.append('username', usernameIn)
    formData.append('password', password)

    axios({
      method: 'POST',
      url: config.url.replace('api/', 'api-token-auth/'),
      data: formData
    })
      .catch(logError)
      .then((res) => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', usernameIn)
        props.callbackModal('login')
        toast.info(`Hello, ${usernameIn}`, {
          position: 'top-right',
          autoClose: 1000,
          icon: '👋',
          theme: localStorage.getItem('theme')
        })
      })
  }

  if (!isLogged) {
    return (
      <section className={`modal-section ${props.loginModal ? 'invisible' : ''}`} id='popup-modal'>
        <ToastContainer />
        <div className='modal-container'>
          <div className='modal-header'>
            <h1 className='modal-header-h1'>Login</h1>
          </div>
          <div className='modal-full-row'>
            <div className='modal-label-input'>
              <label htmlFor='login' className='modal-label'>
                Login
              </label>
              <input
                type='text'
                id='Login'
                name='Login'
                autoComplete='username'
                value={usernameIn}
                onChange={(e) => setUsernameIn(e.target.value)}
                placeholder='User login'
                className='modal-input'
              />
            </div>
          </div>
          <div className='modal-full-row'>
            <div className='modal-label-input'>
              <label htmlFor='password' className='modal-label'>
                Password
              </label>

              <div className='flex flex-row items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='User password'
                  className='modal-input grid-9 mr-4'
                />
                <label
                  className='bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-m text-gray-600 font-mono cursor-pointer h-full'
                  htmlFor='toggle'
                  style={{ position: 'relative' }}
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'hide' : 'show'}
                </label>
              </div>
            </div>
          </div>

          <div className='mt-5 flex modal-full-row'>
            <button className='modal-cancel' onClick={() => props.callbackModal('login')}>
              Cancel
            </button>
            <button className='modal-save' onClick={() => postData()}>
              Login
            </button>
          </div>
          <div className='mt-5 modal-full-row text-xl'>
            <p>Don't have an account? Well, registration isn't done yet...</p>
          </div>
        </div>
      </section>
    )
  } else {
    return (
      <section className={`modal-section ${props.loginModal ? 'invisible' : ''}`} id='popup-modal'>
        <ToastContainer />
        <div className='modal-container'>
          <div className='modal-header'>
            <h1 className='modal-header-h1'>{`Hello ${user.username} :)`}</h1>
          </div>
          <div className='modal-container'>
            <div className='modal-full-row'>
              <strong>Username: </strong>
              <p>{user.username}</p>
            </div>
            <div className='modal-full-row'>
              <strong>Email: </strong> <p>{user.email}</p>
            </div>{' '}
            <div className='modal-full-row'>
              <strong>Groups: </strong> <p>{user.groups}</p>
            </div>
            <div className='mt-5 flex modal-full-row'>
              <button className='modal-cancel' onClick={() => props.callbackModal('login')}>
                Close
              </button>
              <button className='modal-cancel' onClick={() => logout()}>
                Logout
              </button>{' '}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LoginModal
