import axios from 'axios';
import store from '../store';
import { getCanvasSuccess } from '../actions/canvas-actions';

/**
 * Get canvas information
 */

export function getCanvas() {
  return axios.get('http://localhost:8080/api/canvas')
    .then(response => {
      store.dispatch(getCanvasSuccess(response.data));
      return response;
    });
}
