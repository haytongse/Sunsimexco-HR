import moment from "moment";
import {useSelector} from 'react-redux';
// export const image_path ="https://card.sunsimexco.com/HR-Admin/uploads/";
export const image_path ="https://sunsimexco.com/employee/HR-Admin/uploads/";
export const fomartDateClient = (date)=>{
    return moment(date).format("DD/MM/YYYY");
}
export const getUserProfile = ()=>{
    const profile = useSelector(state=>state.profile);
    return profile;
}
export const getUserId =()=>{
    const profile = getUserProfile();
    return profile ? profile.user_id: null;
}