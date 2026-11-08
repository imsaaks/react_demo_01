// import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import AxiosApi from '@common/service/AxiosApi.ts';

const MemberDetail = () => {

    const { id } = useParams();
    const [ detailInfo, setDetailInfo] = useState<any>(null);
    const api = AxiosApi();

    const getData = () => {
        const url: string = '/users/find/' + id;
        api.get(url).then((response) => {
            if (response.data) {
                // console.log(response.data);
                setDetailInfo(response.data);
            }
        }).catch(() => {
            // console.log(error);
        })
    }


    useEffect(() => {
        console.log('id', id);
        if (id) {
            getData();
        } else {
            //
        }

    }, []);

    return (
        <>
            {
                detailInfo &&
                <div>{detailInfo.hnglNm}</div>
            }
            
        </>
    );
};

export default MemberDetail;