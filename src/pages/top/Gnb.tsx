// import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import axiosApi from '@common/service/AxiosApi.ts';
import useOutsideClick from '@common/custom-hook/useOutsideClick.ts';
import { useCookies } from "react-cookie";
import { type MemberBasicInfo } from '@pages/member/props/MemberProps.ts';
import {ConfigConstants} from "@common/constants/ConfigConstants.ts";

const Gnb = () => {

    const [isPopOpen, setIsPopOpen] = useState(false);
    const dropRef = useRef<HTMLDivElement | null>(null);
    const [cookies, setCookie, removeCookie] = useCookies();
    const api = axiosApi();
    const navigate = useNavigate();
    const info: MemberBasicInfo = JSON.parse(localStorage.getItem(ConfigConstants.USER_BASIC_INFO_KEY_NAME) || '{}');

    useOutsideClick(dropRef, ()=> {
        setIsPopOpen(false);
    });

    const logout=()=> {
        setCookie('LOGOUT', new Date().getTime(), { path: '/' });
        api.get('/logout').then(()=>{
            removeAllCookieAndNavigate();

        }).catch(() => {
            removeAllCookieAndNavigate();
        });
    }

    const removeAllCookieAndNavigate = () => {
        // cookies 객체에 담긴 모든 키값 순회
        Object.keys(cookies).forEach((cookieName) => {
            removeCookie(cookieName, { path: '/' }); // 설정했던 path 옵션과 일치해야 삭제됨
        });
        // storage 모두 삭제
        localStorage.clear();
        navigate('/');
    }

    const headerLogoClick = () => {
        navigate('/pageset');
    }

    return (
        <>
            <header className="layout-gnb">
                <div className="cont-grow">
                    <h1 className="header-logo">
                        <a href="#" className="logo-link" onClick={(e) => {e.preventDefault(); headerLogoClick()}}>
                            <i className="icon-logo">
                                경영정보시스템
                            </i>
                        </a>
                    </h1>
                </div>
                <div className="right-end">
                    <div className="header-utils">
                        <div className="select-frame">
                            <div className="gnb-dropdown-layer" ref={dropRef}>
                                <a href="#" className={isPopOpen? 'btn-more is-open': 'btn-more' }
                                   onClick={(e) => {e.preventDefault(); setIsPopOpen((isPopOpen) => !isPopOpen)}}>
                                    <i className="icon-user"></i> <span className="txt-name">{info.hnglNm}님</span> <span className="txt-team">{info.teamNm} / {info.roleNm}</span> <i className="icon-more-rotate"></i>
                                </a>

                                { isPopOpen &&
                                    <div className="layer-dropdown-popup">
                                        <div className="dropdown-scroll">
                                            <div className="dropdown-list">
                                                <div className="dropdown-items is-active">
                                                    <a href="#" className="dropdown-link"
                                                       onClick={(e) => {e.preventDefault()}}>개인정보</a>
                                                </div>
                                                <div className="dropdown-items">
                                                    <a href="#" className="dropdown-link"
                                                       onClick={(e) => {e.preventDefault()}}>비밀번호 변경</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="btn-frame">
                            <button type="button" className="button-miner size-small" onClick={logout}>
                                <span className="btn-inner">
                                    <em className="btn-txt">로그아웃</em>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Gnb;