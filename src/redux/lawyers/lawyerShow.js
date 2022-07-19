const API_LAWYERS_SHOW_ENDPOINT = `${process.env.REACT_APP_API_HOST}/api/v1/lawyers`;
const REQUEST_STARTED = 'book-a-lawyer/lawyerShow/REQUEST_STARTED';
const REQUEST_FAILED = 'book-a-lawyer/lawyerShow/REQUEST_FAILED';
const REQUEST_COMPLETED = 'book-a-lawyer/lawyerShow/REQUEST_COMPLETED';
const RESET_STATE = 'book-a-lawyer/lawyerShow/RESET_STATE';
const initialState = {
  status: 'idle',
};

const reducer = (state = initialState, action) => {
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
    case RESET_STATE:
      return action.payload;
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

const requestCompleted = ({ lawyer }) => ({
  type: REQUEST_COMPLETED,
  payload: {
    status: 'success',
    lawyer,
  },
});

export const resetShowLawyerState = () => ({
  type: RESET_STATE,
  payload: {
    status: 'idle',
  },
});

export const getLawyer = (id) => async (dispatch, getState) => {
  dispatch(requestStarted());
  try {
    const { authToken } = getState().auth;
    const response = await fetch(`${API_LAWYERS_SHOW_ENDPOINT}/${id}`, {
      headers: {
        Authorization: authToken,
      },
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }

    dispatch(requestCompleted(await response.json()));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export default reducer;
