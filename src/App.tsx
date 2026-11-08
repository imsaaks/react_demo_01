import { RouterProvider } from 'react-router';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import { rootRouter } from '@common/router/rootRouter'
import Loading from '@common/component/loading/Loading.tsx'

const App = () => {
    const isLoading: boolean = useSelector((state: any) => state.loading.isShow)

    // Calling setState synchronously within an effect can trigger cascading renders
    // 이펙트 내에서 setState를 동기적으로 호출하면 연쇄 렌더링이 발생할 수 있습니다
    useEffect(() => {
        // setIsloading(false);
    }, [])



    return (
        <>
            { isLoading && <Loading></Loading> }
            {/*<Login></Login>*/}
            <ToastContainer></ToastContainer>
            <RouterProvider router={rootRouter}></RouterProvider>
        </>
    );
};

export default App;