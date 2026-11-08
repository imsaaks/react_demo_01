// import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import AxiosApi from '@common/service/AxiosApi.ts';
import ContentsHead from "@common/component/contents/ContentsHead.tsx";
import toastService from '@common/service/toastService.ts';

const MemberDetail = () => {

    const { id } = useParams();
    const [ detailInfo, setDetailInfo] = useState<any>(null);
    const api = AxiosApi();
    const navigate = useNavigate();

    const getData = () => {
        const url: string = '/users/find/' + id;
        api.get(url).then((response) => {
            if (response.data) {
                setDetailInfo(response.data);
            } else {
                goList();
            }
        }).catch(() => {
            // console.log(error);
            goList();
        })
    }
    const goList = () => {
        toastService('error', '정보를 찾을 수 없습니다');
        navigate('/pageset');
    }


    useEffect(() => {
        // console.log('id', id);
        if (id) {
            getData();
        } else {
            //
            goList();
        }

    }, []);

    return (
        <>
            {
                detailInfo &&
                <div className="page" style={{ height: 'calc(100vh - 44px)'}}>
                    <div className="container-content">
                        <div className="content-head">
                            <ContentsHead></ContentsHead>
                        </div>

                        <div className="content-body">
                            <div className="content-body-inner">
                                <div className="common-table-framework">
                                    <div className="common-table-head">
                                        <div className="cont-grow">
                                            <div className="common-filter-detail common-margin-top-a">
                                                <div className="cont-grow">
                                                    {detailInfo.empno}



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
            
        </>
    );
};

export default MemberDetail;