const REQUEST_STARTED = 'book-a-lawyer/auth/REQUEST_STARTED';
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

export default reducer;
