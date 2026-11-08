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
    const [tabIndex, setTabIndex] = useState('0');
    const mainTabList: any[] = [
        {value: '0', label: '기본정보'},
        {value: '1', label: '가족정보'},
        {value: '2', label: '경력사항'},
        {value: '3', label: '자격증 및 면허'},
        {value: '4', label: '재정보증'},
        {value: '5', label: '임면사항'},
        {value: '6', label: '포상징계'},
        {value: '7', label: '학력사항'},
        {value: '8', label: '교육사항'}
    ];

    const getData = () => {
        const url: string = '/users/find/' + id;
        api.get(url).then((response) => {
            if (response.data) {
                setDetailInfo(response.data);
            } else {
                goList(true);
            }
        }).catch(() => {
            // console.log(error);
            goList(true);
        })
    }
    const goList = (isError?: boolean) => {
        if (isError) {
            toastService('error', '정보를 찾을 수 없습니다');
        }

        navigate('/pageset');
    }


    useEffect(() => {
        if (id) {
            getData();
        } else {
            //
            goList(true);
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
                                <div className="common-tab-contain">
                                    <div className="common-tab-primary common-margin-top-a">
                                        <div className="scroll-inner">

                                            <div className="tab-list" role="tablist">

                                                { mainTabList.map((item: any, index: number) => (
                                                    <div className={`tab-items ${tabIndex === item.value?'is-active':''}`} key={'tab-item' + index}>
                                                        <button type="button" className="btn-tab" onClick={() => setTabIndex(item.value)}>
                                                            <span className="txt-label">{item.label}</span>
                                                        </button>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>



                                    <div className="primary-tab-pannel common-margin-top-a">
                                        <div className="scroll-inner">


                                            <div className="common-file-place common-margin-top-b">
                                                <div className="place-left">
                                                    <div className="file-frame">


                                                    </div>
                                                </div>




                                                <div className="place-right">
                                                    <div className="form-hori-table">
                                                        <div className="scroll-inner">
                                                            <table className="table">
                                                                <caption><span>내역</span></caption>
                                                                <colgroup>
                                                                    <col style={{'width':'160px'}} />
                                                                    <col  />
                                                                    <col style={{'width':'160px'}} />
                                                                    <col />
                                                                    <col style={{'width':'160px'}} />
                                                                    <col />
                                                                </colgroup>
                                                                <tbody>

                                                                <tr>
                                                                    <th scope="row">
                                                                        <span className="txt-title">입사일자</span>
                                                                    </th>
                                                                    <td>
                                                                        { detailInfo.entcomDd && <span className="txt-data">{detailInfo.entcomDd}</span>}
                                                                        { !detailInfo.entcomDd && <span className="txt-data type-onhold">정보없음</span>}
                                                                    </td>

                                                                    <th scope="row">
                                                                        <span className="txt-title">정년일자</span>
                                                                    </th>
                                                                    <td>
                                                                        { detailInfo.rtagDd && <span className="txt-data">{detailInfo.rtagDd}</span>}
                                                                        { !detailInfo.rtagDd && <span className="txt-data type-onhold">정보없음</span>}
                                                                    </td>

                                                                    <th scope="row">
                                                                        <span className="txt-title">퇴직일자</span>
                                                                    </th>

                                                                    <td>
                                                                        { detailInfo.rsgnDd && <span className="txt-data">{detailInfo.rsgnDd}</span>}
                                                                        { !detailInfo.rsgnDd && <span className="txt-data type-onhold">정보없음</span>}
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <th scope="row">
                                                                        <span className="txt-title">사원번호</span>
                                                                    </th>
                                                                    <td>
                                                                        <span className="txt-data">
                                                                            {detailInfo.empno}
                                                                        </span>
                                                                    </td>

                                                                    <th scope="row">
                                                                        <span className="txt-title">직원구분</span>
                                                                    </th>
                                                                    <td colSpan={3}>
                                                                        {detailInfo.hdofNm}
                                                                    </td>
                                                                </tr>


                                                                <tr>
                                                                    <th scope="row">
                                                                        <span className="txt-title">사원유형</span>
                                                                    </th>
                                                                    <td>
                                                                        <span className="txt-data">
                                                                            {detailInfo.empTpNm}
                                                                        </span>
                                                                    </td>

                                                                    <th scope="row">
                                                                        <span className="txt-title">사원계약유형</span>
                                                                    </th>
                                                                    <td colSpan={3}>
                                                                        {
                                                                            detailInfo.empTp === '10' &&
                                                                            <span className="txt-data type-onhold">
                                                                                사원유형이 단순계약 일 경우
                                                                            </span>
                                                                        }
                                                                        {
                                                                            detailInfo.empTp !== '10' &&
                                                                            <span className="txt-data">
                                                                                {detailInfo.empCntrTpNm}
                                                                            </span>
                                                                        }

                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <th scope="row">
                                                                        <span className="txt-title">성명(한글명)</span>
                                                                    </th>
                                                                    <td>
                                                                        <span className="txt-data">
                                                                            {detailInfo.hnglNm}
                                                                        </span>
                                                                    </td>

                                                                    <th scope="row">
                                                                        <span className="txt-title">한문명</span>
                                                                    </th>
                                                                    <td>
                                                                        { detailInfo.chineseCharNm && <span className="txt-data">{detailInfo.chineseCharNm}</span>}
                                                                        { !detailInfo.chineseCharNm && <span className="txt-data type-onhold">정보없음</span>}
                                                                    </td>

                                                                    <th scope="row">
                                                                        <span className="txt-title">영문명</span>
                                                                    </th>
                                                                    <td>
                                                                        { detailInfo.engNm && <span className="txt-data">{detailInfo.engNm}</span> }
                                                                        { !detailInfo.engNm && <span className="txt-data type-onhold">정보없음</span> }
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="common-both-side"  style={{'marginTop':'30px'}}>
                                                <div className="left-start common-gap-a">

                                                    <button type="button" className="button-miner size-medium" onClick={() => goList()}>
                                                        <span className="btn-inner">
                                                            <em className="btn-txt">목록으로</em>
                                                        </span>
                                                    </button>


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