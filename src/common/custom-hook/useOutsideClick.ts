import { useEffect } from 'react';

const useOutsideClick = (ref: any, callback: any) => {
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            // ref가 설정되어 있고, 클릭한 요소가 ref 내부에 포함되지 않는 경우
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        // 'mousedown' 또는 'click' 이벤트 사용 (mousedown이 UX상 더 빠릿하게 반응함)
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [ref, callback]);
};

export default useOutsideClick;