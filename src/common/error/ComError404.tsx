// import React from 'react';
import { useNavigate } from 'react-router';

const ComError404 = () => {

    const navigate = useNavigate();

    const moveClick =() => {
        navigate('/');
    }
    return (
        <>
            <div className="error-contain">
                <div className="error-section">
                    <div className="error-inner">
                        <div className="error-head">
                            <div className="title-frame">
                                <span className="txt-label">
                                    404 Not Found
                                </span>
                            </div>
                        </div>
                        <div className="error-body">
                            <div className="txt-frame">
                                <span className="txt-title">
                                    페이지를 찾을 수 없습니다.
                                </span>
                                <span className="txt-desc common-margin-top-a">
                                    주소가 변경 또는 삭제 되었거나, 일시적인 사용 중단으로 요청하신 페이지를 찾을 수 없습니다.
                                </span>
                            </div>
                        </div>
                        <div className="error-foot">
                            <div className="btn-frame">
                                <button type="button" className="button-outline size-large" onClick={moveClick}>
                                    <span className="btn-inner">
                                        <em className="btn-txt">화면이동</em>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComError404;