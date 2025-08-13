import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProfile } from '@/services/Service';
import { setUsername, setUserID } from '@/redux/slices/userSlices';
import routes from '@/config/routes';

export default function useAuthProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const profile = await getProfile();
                dispatch(setUsername(profile.username));
                dispatch(setUserID(profile.userId));
            } catch (err) {
                navigate(routes.login);
            }
        })();
    }, [navigate, dispatch]);
}
