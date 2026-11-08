import loadable from '@loadable/component'
import { createBrowserRouter, redirect  } from "react-router";
import axios from "axios";

const HomeComponent: any = loadable(() => import('@pages/Home.tsx'));
const LoginComponent: any = loadable(() => import ('@pages/login/Login.tsx'));
const PageSetComponent: any = loadable(() => import('@pages/PageSet.tsx'));
const Error404Component: any = loadable(() => import('@pages/error/Error404.tsx'));

// pageset
const MemberListComponent: any = loadable(() => import('@pages/member/MameberList.tsx'));
const MemberDetailComponent: any = loadable(() => import('@pages/member/MemberDetail.tsx'));
const ComError404Component: any = loadable(() => import('@common/error/ComError404.tsx'));


// 인증 체크 함수 (예시)
const checkAuth = () => {
    return axios.get('/api/v1/users/check/token').then((response) => {
        if (response.data) {
            if (response.data.state === 'NORMAL' && response.data.userDto !== null) {
                return true;
            }
        }
        return false;
    }).catch(() => {
        return false;
    });
};

const protectedLoader =  async(): Promise<any> =>  {
    const result = await checkAuth();
    if (result) {
        return null;
    } else {
        return redirect('/login');
    }
};



// 서버 사이드 렌더링(SSR) 환경이 아니라 오직 클라이언트 사이드(CSR) 빌드 최적화만을 위해
// @loadable/component를 사용하는 것이라면, React Router v6.4부터 기본 내장된 lazy()
// 프로퍼티를 사용하는 것도 훌륭한 대안. 외부 라이브러리 의존성을 줄일 수 있다
export const rootRouter: any = createBrowserRouter([
    {
        path: '/',
        Component: HomeComponent
    },
    {
        path: '/login',
        Component: LoginComponent
    },
    {
        path: '/pageset',
        Component: PageSetComponent,
        loader: protectedLoader,
        children: [
            {
                path: '',
                Component: MemberListComponent,
                loader: protectedLoader
            },
            // {
            //     path: 'member',
            //     Component: MemberListComponent
            // },
            {
                path: 'member/:id',
                Component: MemberDetailComponent,
                loader: protectedLoader
            },
            {
                path: '*',
                Component: ComError404Component
            }
        ]
    },
    {
        path: '*',
        Component: Error404Component
    }
]);