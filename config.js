import axios from 'axios';

export default function AxiosConfig(){
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}