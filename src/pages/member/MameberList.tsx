import { useEffect } from 'react';
import { useState } from 'react';
import AxiosApi from '@common/service/AxiosApi.ts';
import ContentsHead from '@common/component/contents/ContentsHead.tsx';
import PageSizeSelect from "@common/component/paging/PageSizeSelect.tsx";
import Paging from '@common/component/paging/Paging.tsx';
import { useNavigate } from 'react-router';
import { MemberSearchVo } from '@pages/member/props/MemberProps.ts';
import { CommonUtil } from '@common/util/CommonUtil.ts';
import { Pageable, PageViewSize } from '@common/component/paging/Pageable.ts';

const MameberList = () => {
    const api = AxiosApi();
    const [dataList, setDataList] = useState<any[]>([]);
    const [searchVo, setSearchVo] = useState<MemberSearchVo>(new MemberSearchVo());
    const [pageable, setPageable] = useState<Pageable>(new Pageable());
    const [hdofCd, setHdofCd] = useState<string>('');
    const [searchOption, setSearchOption] = useState<string>('hnglNm');
    const [oldSearchOption, setOldSearchOption] = useState<string>('hnglNm');
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [oldSearchText, setOldSearchText] = useState('');
    const [isSeaching, setIsSeaching] = useState<boolean>(false);

    const getComCodeList= (key: string, isAddNull?: boolean): any[] => {
        return CommonUtil.getCommonCodeList(key, isAddNull);
    }
    const getSearchOptions = (): any[] => {
        return [
            {value: 'hnglNm', label: '성명(한글)'},
            {value: 'empno', label: '사원번호'}
        ];
    }
    const getData = async () => {
        const params = CommonUtil.cloneCleanNullKet(searchVo);
        const url: string = '/users/search';
        api.get(url, {params}).then((response) => {
            let data: any[] = [];
            if (response.data) {
                if (response.data.content && response.data.content.length > 0) {
                    data = response.data.content;
                }
                setPageable(CommonUtil.getPageable(response.data));
            }
            setDataList(data);
            if (isSeaching) {
                if (searchText !== oldSearchText) {
                    setSearchText(oldSearchText);
                }
                if (searchOption !== oldSearchOption) {
                    setSearchOption(oldSearchOption);
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const pagingClickHander = (e: number) => {
        setSearchVo({...searchVo, pageNo: e});
    }
    const viewSizeChangeHandler = (size: number) => {
        setSearchVo({...searchVo, pageNo: 0, pageSize: size});
    }
    const goMemberDetail = (empno:string) => {
        // console.log(empno);
        navigate('/pageset/member/' + empno);
    }
    const getListNum = (num: number): number => {
        if (pageable) {
            return pageable.totalElements - ((pageable.number *pageable.size) + num);
        } else {
            return num;
        }
    }

    const changeOrder= (key:string) => {
        if (searchVo.sortBy === key) {
            if (searchVo.sortOrder === 'desc') {
                setSearchVo({...searchVo, sortOrder: 'asc'});
            } else {
                setSearchVo({...searchVo, sortOrder: 'desc'});
            }

        } else {
            setSearchVo({...searchVo, sortBy: key});
        }
    }

    const hdofCdChangeHandler = (e: any) => {
        setHdofCd(e);
        setSearchVo({...searchVo, pageNo: 0, hdofCd: e});
    }
    const searchOptionChangeHandler = (e: any) => {
        setSearchOption(e);
    }
    const searchTextKeyHandler = (e: any) => {
        if (e.key === 'Enter') {
            //
            goSearch();
        }
    }

    const goSearch = () => {
        setIsSeaching(true);
        setOldSearchText(searchText);
        setOldSearchOption(searchOption);
        const _copy: MemberSearchVo = structuredClone(searchVo);
        _copy.pageNo = 0;
        _copy.hnglNm = '';
        _copy.empno = '';
        if (searchText && (searchText).trim().length > 0) {
            if (searchOption === 'hnglNm') {
                _copy.hnglNm = searchText;
            } else {
                _copy.empno = searchText;
            }
        }
        setSearchVo(_copy);
    }

    const goReset = () => {
        setIsSeaching(false);
        setSearchText('');
        setHdofCd('');
        setOldSearchText('');
        setSearchOption('hnglNm');
        setOldSearchOption('hnglNm');
        setSearchVo({...searchVo, pageNo: 0, hdofCd: '', hnglNm:'', empno:''});
    }


    useEffect(() => {
        getData();
    }, [searchVo]);

    return (
        <>
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


                                                <div className="common-form-group type-inline-flex">
                                                    <div className="form-items">
                                                        <div className="cont-grow common-gap-a">
                                                            <div
                                                                className="common-radio-group type-inline-flex common-gap-a">
                                                                { getComCodeList('HDOF_CD', true).map((item: any, index: number) => (
                                                                    <div className="component-radio size-medium"
                                                                         key={'hdofCd_key' + index}>
                                                                        <input type="radio" id={'hdofCd_id' + index}
                                                                               name="hdofCdGroup" value={item.value}
                                                                               checked={hdofCd === item.value}
                                                                               onChange={(e) => hdofCdChangeHandler(e.target.value)}/>
                                                                        <label className="label-box"
                                                                               htmlFor={'hdofCd_id' + index}>
                                                                            <span className="check-bar"></span>
                                                                            <span
                                                                                className="check-label">{item.label}</span>
                                                                        </label>

                                                                    </div>
                                                                ))
                                                                }
                                                            </div>

                                                            <i className="icon-line size-large"></i>

                                                            {/*react 에선 selected 대신 value 값을 사용*/}
                                                            <select id="" title="선택" className="component-select size-medium common-width-b"
                                                                    value={searchOption}
                                                                    onChange={(e) => searchOptionChangeHandler(e.target.value)}>
                                                                {
                                                                    getSearchOptions().map((item: any, index: number) => (
                                                                        <option value={item.value} key={'searchOp'+ index}>{item.label}</option>

                                                                    ))
                                                                }
                                                            </select>


                                                            <div className="component-input size-medium common-width-c">
                                                                <div className="left-start">
                                                                    <i className="icon-search size-large"></i>
                                                                </div>
                                                                <div className="cont-grow">
                                                                    <div className="input-field">
                                                                        <input type="text" placeholder="검색어 입력" autoComplete="off" maxLength={20}
                                                                        value={searchText}
                                                                        onChange={(e) => setSearchText(e.target.value)}
                                                                        onKeyDown={searchTextKeyHandler}/>
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <button type="button" className="button-outline size-medium" onClick={goSearch}>
                                                                <span className="btn-inner">
                                                                    <em className="btn-txt">조회</em>
                                                                </span>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className="right-end">

                                            </div>
                                        </div>

                                        <div className="common-board-top common-margin-top-a">
                                            <div className="cont-grow">
                                                <div className="total-frame">
                                                    <span className="txt-total">총 {pageable.totalElements} 개</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>



                                <div className="common-table-body">

                                    <div className="form-verti-table-a">
                                        <div className="scroll-inner">
                                            <table className="table">
                                                <caption><span>내역</span></caption>
                                                <colgroup>
                                                    <col style={{width:'65px'}}/>
                                                    <col style={{width:'100px'}}/>
                                                    <col style={{}}/>
                                                    <col style={{width:'9%'}}/>
                                                    <col style={{width:'9%'}}/>

                                                    <col style={{width:'9%'}}/>
                                                    <col style={{width:'9%'}}/>
                                                    <col style={{width:'9%'}}/>
                                                    <col style={{width:'9%'}}/>
                                                    <col style={{width:'11%'}}/>
                                                </colgroup>
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <span className="txt-title">번호</span>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">사원번호</span>
                                                        <a href="#" className={`link-sorting 
                                                        ${searchVo.sortBy === 'empno' && searchVo.sortOrder === 'asc'?'type-asc':''}
                                                        ${searchVo.sortBy === 'empno' && searchVo.sortOrder === 'desc'?'type-desc':''}`}
                                                           onClick={(e) => {e.preventDefault(); changeOrder('empno')}}>정렬선택</a>
                                                    </th>


                                                    {/*<a href="javascript:void(0);" class="link-sorting" (click)="changeOrderInfo('empno')"*/}
                                                    {/*[ngClass]="{'type-asc': requestParam.sortBy === 'empno' && requestParam.sortOrder === 'asc',*/}
                                                    {/*'type-desc': requestParam.sortBy === 'empno' && requestParam.sortOrder === 'desc'}">정렬선택</a>*/}


                                                    <th scope="col">
                                                        <span className="txt-title">성명 한글(한문)</span>
                                                        <a href="#" className={`link-sorting 
                                                        ${searchVo.sortBy === 'hnglNm' && searchVo.sortOrder === 'asc'?'type-asc':''}
                                                        ${searchVo.sortBy === 'hnglNm' && searchVo.sortOrder === 'desc'?'type-desc':''}`}
                                                           onClick={(e) => {e.preventDefault(); changeOrder('hnglNm')}}>정렬선택</a>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">사원유형</span>
                                                        <a href="#" className={`link-sorting 
                                                        ${searchVo.sortBy === 'empTp' && searchVo.sortOrder === 'asc'?'type-asc':''}
                                                        ${searchVo.sortBy === 'empTp' && searchVo.sortOrder === 'desc'?'type-desc':''}`}
                                                           onClick={(e) => {e.preventDefault(); changeOrder('empTp')}}>정렬선택</a>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">직원구분</span>
                                                        <a href="#" className={`link-sorting 
                                                        ${searchVo.sortBy === 'hdofCd' && searchVo.sortOrder === 'asc'?'type-asc':''}
                                                        ${searchVo.sortBy === 'hdofCd' && searchVo.sortOrder === 'desc'?'type-desc':''}`}
                                                           onClick={(e) => {e.preventDefault(); changeOrder('hdofCd')}}>정렬선택</a>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">부서</span>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">팀</span>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">입사일자</span>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">퇴직일자</span>
                                                    </th>
                                                    <th scope="col">
                                                        <span className="txt-title">이용권한</span>
                                                    </th>
                                                </tr>
                                                </thead>

                                                <tbody>

                                                { dataList && dataList.length > 0 && dataList.map((item, index) => (
                                                    <tr key={item.empno}>
                                                        <td>
                                                            <span className="txt-data">
                                                                {getListNum(index)}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <a href="#"
                                                               className="txt-data type-ellipsis"
                                                               onClick={(e) => {e.preventDefault(); goMemberDetail(item.empno)}}>
                                                                {item.empno}
                                                            </a>
                                                        </td>


                                                        <td>
                                                            {item.chineseCharNm && <span className="txt-data">{item.hnglNm} ({item.chineseCharNm})</span>}
                                                            {!item.chineseCharNm && <span className="txt-data">{item.hnglNm}</span>}
                                                        </td>
                                                        <td>
                                                            <span className="txt-data">
                                                                {item.empTpNm}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span className="txt-data">
                                                                {item.hdofNm}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            {item.deptNm && <span className="txt-data">{item.deptNm}</span>}
                                                            {!item.deptNm && <span className="txt-data type-onhold">정보없음</span>}
                                                        </td>
                                                        <td>
                                                            {item.teamNm && <span className="txt-data">{item.teamNm}</span>}
                                                            {!item.teamNm && <span className="txt-data type-onhold">정보없음</span>}
                                                        </td>
                                                        <td>
                                                            {item.rsgnDd && <span className="txt-data">{CommonUtil.convertDateToShort(item.entcomDd, '.')}</span>}
                                                            {!item.rsgnDd && <span className="txt-data type-onhold">정보없음</span>}
                                                        </td>
                                                        <td>
                                                            {item.rsgnDd && <span className="txt-data">{CommonUtil.convertDateToShort(item.rsgnDd,'.')}</span>}
                                                            {!item.rsgnDd && <span className="txt-data type-onhold">정보없음</span>}
                                                        </td>
                                                        <td>
                                                            {item.roleNm && <span className="txt-data type-ellipsis">{item.roleNm}</span>}
                                                            {!item.roleNm && <span className="txt-data type-onhold">정보없음</span>}
                                                        </td>
                                                    </tr>
                                                    ))
                                                }


                                                { (!dataList || dataList.length == 0) &&
                                                    <tr>
                                                        <td className="td-nodata" colSpan={10}>
                                                            { isSeaching !== true &&
                                                                <div className="nodata-frame">
                                                                    <span className="txt-nodata">등록된 데이터가 없습니다</span>
                                                                </div>
                                                            }

                                                            { isSeaching === true &&
                                                                <div className="nodata-frame">
                                                                    <span className="txt-nodata">검색 결과가 없습니다.</span>
                                                                    <button type="button" className="button-solid size-small" onClick={goReset}>
                                                                            <span className="btn-inner">
                                                                                <em className="btn-txt">검색 초기화</em>
                                                                            </span>
                                                                    </button>
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>



                                <div className="common-table-foot">
                                    <div className="left-start">
                                        <PageSizeSelect optionList={PageViewSize.pageViewSizeList} onViewSizeChangeEvent={(e:number) => viewSizeChangeHandler(e)}></PageSizeSelect>
                                    </div>
                                    <div className="cont-grow">
                                        { pageable && pageable.totalElements > 0 &&
                                            <Paging pageInfo={pageable} pageList={CommonUtil.getPagingList(pageable)} onPagingEvent={(e: number) => pagingClickHander(e)}></Paging>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MameberList;