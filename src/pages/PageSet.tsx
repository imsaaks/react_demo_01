import { useEffect, useState } from 'react';
import { Outlet} from 'react-router';
import Gnb from '@pages/top/Gnb.tsx';
import Lnb from '@pages/left/Lnb.tsx';
import AxiosApi from '@common/service/AxiosApi.ts';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { CommonUtil } from '@common/util/CommonUtil.ts';
import { ConfigConstants } from '@common/constants/ConfigConstants';



const PageSet = () => {

    const api = AxiosApi();
    const [ isCodeLoaded, setIsCodeLoaded ] = useState<boolean>(false);
    const [ isMenuLoaded, setIsMenuLoaded ] = useState<boolean>(false);

    const getAllCodeList = () => {
        const params: any = CommonUtil.getAllCommonCodeParams();
        api.get('/common/code',{params}).then((response) => {
            if (response.data) {
              const json: string = JSON.stringify(response.data.content);
              localStorage.setItem(ConfigConstants.COMMON_CODE_KEY_NAME, json);
            }
            setIsCodeLoaded(true);
        }).catch(() => {
            //
        });
    }

    const getUserMenuList = () => {
        api.get('/menus/user').then((response) => {
            if (response.data) {
                const menus: any[] = CommonUtil.makeUserMenuList(response.data);
                const json: string = JSON.stringify(menus);
                localStorage.setItem(ConfigConstants.USER_MENU_KEY_NAME, json);
            }
            setIsMenuLoaded(true);
        }).catch(() => {
            //
        });
    }

    useEffect(() => {
        getAllCodeList();
        getUserMenuList();
    }, []);

    return (
        <>
            { isCodeLoaded && isMenuLoaded &&
                <div className="project-sbus" id="project-sbus">
                    <Gnb></Gnb>

                    <div className="layout_container" style={{'height': 'calc(100vh - 44px)'}}>
                        <Splitter style={{ 'height': 'calc(100vh - 44px)' }} gutterSize={19}>

                            <SplitterPanel size={20} minSize={10}>
                                <Lnb></Lnb>
                            </SplitterPanel>


                            <SplitterPanel size={80}>
                                <div className="layout-content">
                                    <Outlet></Outlet>
                                </div>
                            </SplitterPanel>
                        </Splitter>

                    </div>
                </div>
            }
        </>
    );
};

export default PageSet;