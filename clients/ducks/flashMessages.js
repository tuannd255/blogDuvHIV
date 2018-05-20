import { createAction, handleActions } from 'redux-actions';
import shortid from 'shortid';

export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const REMOVE_FLASH_MESSAGE = 'REMOVE_FLASH_MESSAGE';
export const REMOVE_ALL_FLASH_MESSAGES = 'REMOVE_ALL_FLASH_MESSAGES';

export const addInfoMessage = createAction(ADD_FLASH_MESSAGE, messages => ({
  type: 'info',
  messages
}));
export const addSuccessMessage = createAction(ADD_FLASH_MESSAGE, messages => ({
  type: 'success',
  messages
}));
export const addWarningMessage = createAction(ADD_FLASH_MESSAGE, messages => ({
  type: 'warning',
  messages
}));
export const addErrorMessage = createAction(ADD_FLASH_MESSAGE, messages => ({
  type: 'error',
  messages
}));
export const removeFlashMessage = createAction(REMOVE_FLASH_MESSAGE);
export const removeAllFlashMessages = createAction(REMOVE_ALL_FLASH_MESSAGES);

const flashMessages = handleActions(
  {
    [ADD_FLASH_MESSAGE]: (state, action) => [
      ...state,
      {
        id: shortid.generate(),
        type: action.payload.type,
        messages: action.payload.messages
      }
    ],
    [REMOVE_FLASH_MESSAGE]: (state, action) => {
      const index = _.findIndex(state, { id: action.payload });
      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    },
    [REMOVE_ALL_FLASH_MESSAGES]: () => []
  },
  []
);

export default flashMessages;
