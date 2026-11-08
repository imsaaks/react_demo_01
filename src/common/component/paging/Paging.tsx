// import React from 'react';
// import { useEffect } from 'react';
const Paging = (props: any) => {

    // useEffect(() => {
    //     console.log("pageInfo", props);
    //     // console.log("pageList", props.pageList);
    //     // console.log("pageInfo", props.pageInfo.number+1);
    // }, []);


    const pButtonClick = (e: number) => {
        props.onPagingEvent(e-1);
    }

    const pMovePage = (direction: 'prev' | 'next') => {
        if (direction === 'prev') {
            if (props.pageInfo.number - 1 >= 0) {
                props.onPagingEvent(props.pageInfo.number-1);
            }
        } else if(direction === 'next') {
            if (props.pageInfo.number + 1 < props.pageInfo.totalPages) {
                props.onPagingEvent(props.pageInfo.number+1);
            }
        }
    }

    return (
        <>
            { props.pageInfo && props.pageList.length > 0 &&
            <div className="common-paging">
                <div className="left-start">
                    <button type="button" className="btn-default btn-prev" aria-current={props.pageInfo.number !== 0} onClick={()=> pMovePage('prev')}>
                        <span className="btn-inner">
                            <i className="icon-arrow-rotate-a"></i>
                            <em className="txt-desc">이전</em>
                        </span>
                    </button>
                </div>
                <div className="cont-grow">

                    {
                        props.pageList.map((item: number, index: number) => (
                            <a href="#" className={(props.pageInfo.number+1 === item)?'num-link is-active' : 'num-link'}
                               key={'page'+ item+'-'+index} onClick={(e) => {e.preventDefault(); pButtonClick(item)}}><span className="txt-num">{item}</span></a>
                        ))
                    }

                    {/*<a href="javascript:;" className="num-link is-active"><span className="txt-num">1</span></a>*/}

                </div>
                <div className="right-end">
                    <button type="button" className="btn-default btn-next" aria-current={props.pageInfo.number !== props.pageInfo.totalPages - 1}
                            onClick={()=> pMovePage('next')}>
                        <span className="btn-inner">
                            <em className="txt-desc">다음</em>
                            <i className="icon-arrow-rotate-a type-direction-right"></i>
                        </span>
                    </button>
                </div>
            </div>
            }

        </>
    );
};

export default Paging;