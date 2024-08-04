import axios from "axios";
import { Alert } from "react-native";
// const base_url = "http://192.168.1.107/api/HRD/HR-Admin/api/";
// const base_url = "https://card.sunsimexco.com/HR-Admin/api/" ;
const base_url = "https://sunsimexco.com/employee/HR-Admin/api/" ;
export const request =  (url, method, param)=>{
    return axios({
        url: base_url + url,
        method : method,
        data:  param
    }).then(res =>{
        return res.data;
    }).catch(err =>{
        console.log(err);
        return false;
    })
}