import { toast } from 'react-toastify'

const makeErrorToast = (errorMessage) => {
  toast.error(`Error: ${errorMessage || 'unknown error occurred'}`, {
    position: 'top-right',
    autoClose: 1000,
    icon: '❗️',
    theme: localStorage.theme
  })
}

const handleError = (error) => {
  let message = ''

  // simple type checking
  if (typeof error === 'string') {
    message = error
  } else if (Array.isArray(error) && error.length === 1) {
    message = error[0]
  } else if ('response' in error) {
    message = 'data' in error.response ? error.response.data : error.response
  } else if ('request' in error) {
    message = error.request
  } else if ('message' in error) {
    message = error.message
  }
  // print and show error and leave
  if (typeof message === 'string' && message !== '') {
    console.log(message)
    makeErrorToast(message)
    return
  }

  // RECURRENCE PATHS
  // if array, reiterate for each element
  if (Array.isArray(message)) {
    for (const msg in message) {
      handleError(msg)
    }
  }
  // for objects move through each key
  else if (typeof message === 'object') {
    // for each message in object
    for (const key in message) {
      let keyMessage = message[key]
      if (typeof keyMessage === 'string') {
        keyMessage = key + ' ' + keyMessage
      }
      handleError(keyMessage)
    }
  }
  // eventually parse whatever it is to a string
  else if (typeof message !== 'string') {
    // parse to string
    try {
      message = JSON.stringify(message)
    } catch (e) {
      message = 'unknown error occurred'
    }
    handleError(message)
  }
}

export default handleError
