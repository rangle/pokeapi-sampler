import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import pokegraph from './pokegraph';

const rootReducer = combineReducers({
  pokegraph,
  routing: routerReducer,
  form: formReducer,
});

export default rootReducer;
