// import React from 'react';

import { CommonUtil } from "@common/util/CommonUtil.ts";
import {TreeView} from "@common/component/tree/TreeView.tsx";


const Lnb = () => {


    const menus: any[] = CommonUtil.getUserMenuList();



    return (
        <>
            <div className="layout_lnb" style={{width: '100%'}}>
                <div className="lnb-header">
                    <div className="cont-grow">

                        <div className="component-input size-medium">
                            <div className="left-start">
                                <i className="icon-search size-large"></i>
                            </div>
                            <div className="cont-grow">
                                <div className="input-field">
                                    <input type="text" placeholder="메뉴 검색"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lnb-body">
                    <div className="scroll-inner" style={{'padding':'unset'}}>
                        <div className="lnb-outer">

                            <nav className="lnb-nav">
                                <ul className="nav-list">
                                    <TreeView data={menus}></TreeView>
                                </ul>
                            </nav>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Lnb;