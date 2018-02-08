import axios from 'axios';


export function get(url) {
  return axios.get(`https://nameless-castle-51857.herokuapp.com/api/v1/${url}`);
}
