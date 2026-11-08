import { useNavigate } from 'react-router';
import { useState, useRef } from 'react'
// 중괄호 없이 가져오며, 이름(CustomName)을 마음대로 바꿀 수 있습니다.
import toastService  from '@common/service/toastService.ts'
import AxiosApi from '@common/service/AxiosApi.ts';


const Login = () => {

    const [empno, setEmpno] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const empnoRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const api = AxiosApi();
    const maxLength = 10;

    const changeIsShowPassword = () => {
        setIsShowPassword((prev) => !prev);
    }

    const empnoKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            //
            passwordRef.current?.focus();
        }
    }

    const passwordKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            //
            goLogin();
        }
    }

    const goLogin = () => {
        if (empno == null || empno.length < 6) {
            toastService('info', '사원번호(7자이상)를 입력하세요');
            return;
        }
        if (password == null || password.length < 4) {
            toastService('info', '비밀번호(4자이상)를 입력하세요');
            return;
        }
        const url: string = '/login';
        const data: any = {
            loginId: empno,
            password: password
        };

        api.post(url, data).then((response: any) => {
            if (response.data) {
               const result: any = response.data;
                if (result.resultCode ===  200) {
                    checkToken();
                } else {
                    if (result.resultCode ===  9999) {
                        toastService('error','아이디 또는 비밀번호가 잘못 되었습니다.');
                    } else {
                        if (result.resultCode ===  9004) {
                            toastService('error','만료된 계정입니다');
                        } else if (result.resultCode ===  9005) {
                            toastService('error','프로그램 권한이 없는 계정입니다 (관리자에 문의하세요)');
                        } else if (result.resultCode ===  9006) {
                            toastService('error','삭제된 계정입니다 (관리자에 문의하세요)');
                        }
                    }
                }
            } else {
                toastService('error','아이디 또는 비밀번호가 잘못 되었습니다.');
            }
        }).catch(() => {
            toastService('error','아이디 또는 비밀번호가 잘못 되었습니다.');
        });
    }

    const checkToken = () => {
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
                toastService('error','아이디 또는 비밀번호가 잘못 되었습니다.');
            }
        }).catch(() => {
            toastService('error','아이디 또는 비밀번호가 잘못 되었습니다.');
        });
    }

    return (
        <div className="project-sbus" id="project-sbus">
            <div className="login-contain">
                <div className="login-section">
                    <div className="login-area">
                        <div className="area-head">
                            <div className="logo-frame">
                                <div className="img-track">
                                    <i className="icon-logo-mis"></i>
                                </div>

                                <div className="txt-track">
                                    <div className="txt-title">경영정보시스템</div>
                                    <div className="txt-sub-title">(내부용)</div>
                                </div>

                            </div>
                        </div>

                        <div className="area-body">
                            <div className="form-verti-board">
                                <div className="field-items width-full">
                                    <div className="item-head">
                                        <div className="cont-grow">
                                            <span className="tit-label is-required">아이디</span>
                                        </div>
                                    </div>
                                    <div className="item-body">
                                        <div className="component-input size-large">
                                            <div className="cont-grow">
                                                <div className="input-field">
                                                    <input type="text"
                                                           ref={empnoRef}
                                                           onChange={(e) => setEmpno(e.target.value)}
                                                           onKeyDown={empnoKeyDown}
                                                           placeholder="사원번호 입력"
                                                           value={empno}
                                                           maxLength={maxLength}
                                                           autoComplete="off"
                                                           autoFocus={true}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field-items width-full">
                                    <div className="item-head">
                                        <div className="cont-grow">
                                            <span className="tit-label is-required">패스워드</span>
                                        </div>
                                        <div className="right-end">
                                            <button type="button" className={isShowPassword ? "button-icon type-eye is-on" : "button-icon type-eye"} onClick={changeIsShowPassword}>
                                                <span className="btn-inner">
                                                    <i className="icon-svg"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="item-body">
                                        <div className="component-input size-large">
                                            <div className="cont-grow">
                                                <div className="input-field">
                                                    <input type={isShowPassword? "type": "password"}
                                                           ref={passwordRef}
                                                           onChange={(e) => setPassword(e.target.value)}
                                                           onKeyDown={passwordKeyDown}
                                                           placeholder="비밀번호 입력"
                                                           value={password}
                                                           autoComplete="off"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="area-foot">
                            <div className="info-user-list">
                                <div className="info-user-items">
                                    <a href="#" className="link-block">
                                        <span className="txt-desc">비밀번호 변경</span>
                                    </a>
                                </div>
                            </div>
                            <div className="common-both-side common-margin-top-b">
                                <div className="row-items">

                                    <button type="button" className="button-solid size-large width-full" onClick={goLogin}>
                                        <span className="btn-inner">
                                            <em className="btn-txt">로그인</em>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright-section">
                    <div className="cont-grow">
                        <span className="txt-desc">
                            Copyright@2004 서울특별시버스운송사업조합. All right reserved.
                        </span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Login;