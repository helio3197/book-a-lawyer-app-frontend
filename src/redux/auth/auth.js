const API_SIGNUP_ENDPOINT = `${process.env.REACT_APP_API_HOST}/users`;
const API_SIGNIN_ENDPOINT = `${process.env.REACT_APP_API_HOST}/users/sign_in`;
const REQUEST_STARTED = 'book-a-lawyer/auth/REQUEST_STARTED';
const REQUEST_FAILED = 'book-a-lawyer/auth/REQUEST_FAILED';
const REQUEST_COMPLETED = 'book-a-lawyer/auth/REQUEST_COMPLETED';
const RESET_STATE = 'book-a-lawyer/auth/RESET_STATE';
const initialState = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth) {
    return {
      status: 'idle',
      userSignedIn: true,
      authToken: auth.token,
      currentUser: auth.user,
    };
  }

  return {
    status: 'idle',
    userSignedIn: false,
  };
};

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        ...action.payload,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        ...action.payload,
      };
    case REQUEST_COMPLETED:
      localStorage.setItem('auth', JSON.stringify({
        token: action.payload.authToken,
        user: action.payload.currentUser,
      }));
      return {
        ...state,
        ...action.payload,
      };
    case RESET_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const requestStarted = () => ({
  type: REQUEST_STARTED,
  payload: {
    status: 'fetching',
  },
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: {
    status: 'failed',
    error,
  },
});

const requestCompleted = (respone) => ({
  type: REQUEST_COMPLETED,
  payload: {
    status: 'success',
    userSignedIn: true,
    authToken: respone.token,
    currentUser: respone.user,
  },
});

export const resetState = () => ({
  type: RESET_STATE,
  payload: {
    status: 'idle',
    error: undefined,
  },
});

export const signUp = (body) => async (dispatch) => {
  dispatch(requestStarted());
  try {
    const response = await fetch(API_SIGNUP_ENDPOINT, {
      method: 'POST',
      body,
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }

    dispatch(requestCompleted({
      token: response.headers.get('Authorization'),
      user: (await response.json()).user,
    }));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const signIn = (body) => async (dispatch) => {
  dispatch(requestStarted());
  try {
    const response = await fetch(API_SIGNIN_ENDPOINT, {
      method: 'POST',
      body,
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }

    dispatch(requestCompleted({
      token: response.headers.get('Authorization'),
      user: (await response.json()).user,
    }));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export default reducer;
