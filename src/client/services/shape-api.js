import axios from 'axios';
import store from '../store';
import { getShapesSuccess } from '../actions/shape-actions';

/**
 * Get shapes
 */

export function getShapes() {
  return axios.get('http://localhost:8080/api/shapes')
    .then(response => {
      store.dispatch(getShapesSuccess(response.data));
      return response;
    });
}
