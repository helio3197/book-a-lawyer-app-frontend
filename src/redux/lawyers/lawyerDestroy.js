const API_LAWYERS_DESTROY_ENDPOINT = `${process.env.REACT_APP_API_HOST}/api/v1/lawyers`;
const REQUEST_STARTED = 'book-a-lawyer/lawyerDestroy/REQUEST_STARTED';
const REQUEST_FAILED = 'book-a-lawyer/lawyerDestroy/REQUEST_FAILED';
const REQUEST_COMPLETED = 'book-a-lawyer/lawyerDestroy/REQUEST_COMPLETED';
const RESET_STATE = 'book-a-lawyer/lawyerDestroy/RESET_STATE';
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

const requestCompleted = () => ({
  type: REQUEST_COMPLETED,
  payload: {
    status: 'success',
  },
});

export const resetDestroyLawyerState = () => ({
  type: RESET_STATE,
  payload: {
    status: 'idle',
  },
});

export const destroyLawyer = (id) => async (dispatch, getState) => {
  dispatch(requestStarted());
  try {
    const { authToken } = getState().auth;
    const response = await fetch(`${API_LAWYERS_DESTROY_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authToken,
      },
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }

    dispatch(requestCompleted());
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export default reducer;
