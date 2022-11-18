import axios from 'axios'
import authHeader from './authHeader'
const url='https://frontend-test-api.aircall.io';

const getCalls=()=>{
    return axios.get(url+"/calls",{headers:authHeader()});
}
const postNotes=(id,context)=>{
    return axios.post(url+`/calls/${id}/note`,{content:context},{headers:authHeader()});
}

const postServices={
    getCalls,
    postNotes,
};
export default postServices