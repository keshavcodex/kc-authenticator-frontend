import { setUserInfo } from '@/store/store';
import { useDispatch } from 'react-redux';

export const initialLoader = () => {
    const dispatch = useDispatch();

    const userInfo = localStorage.getItem('userInfo');
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
    dispatch(setUserInfo(parsedUserInfo));
    console.log('userInfo in local', parsedUserInfo);
}