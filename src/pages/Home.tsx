import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { Lottie } from 'lottie-react';
import lottieJson from '@assets/dist/json/loding_animation.json';
import AxiosApi from '@common/service/AxiosApi';

const Home = () => {

    const api = AxiosApi(false);
    const navigate = useNavigate();
    const authCheck = () => {
        let isAuthenticated = false;
        api.get('/users/check/token').then((response) => {
            if (response.data) {
                if (response.data.state === 'NORMAL' && response.data.userDto !== null) {
                    isAuthenticated = true;
                }
            }
            if (isAuthenticated) {
                navigate('/pageset');
            } else {
                navigate('/login');
            }
        }).catch(() => {
            navigate('/login');
        });
    }

    useEffect(() => {
        const timer: any = setTimeout(() => {
            authCheck();
        }, 1000);
        return () => { clearTimeout(timer); }
    }, []);
    return (
        <>
            <div className="modal-loding">
                <div className="loding-frame">
                    <div className="lottie-track">
                        <Lottie src={lottieJson}
                                style={{ width: 300, height: 225 }}
                                loop={true}
                                autoplay={true} />
                    </div>
                    <div className="txt-track">
                        <span className="txt-desc">
                            잠시만 기다려주세요...
                        </span>
                    </div>
                    <div className="loding-track">
                        <div className="loding-block">
                            <div className="spin-box"></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Home;