import { PageConstant } from '@common/component/paging/Pageable.ts';


export class MemberSearchVo {
    pageSize: number = PageConstant.SIZE;
    pageNo: number = 0;
    sortBy: string = 'empno';
    sortOrder: string = 'asc';

    // 재직코드
    hdofCd: string = '';
    // 사원유형
    empTp: string  = '';
    // 사원번호
    empno: string  = '';
    // 성명
    hnglNm: string = '';
    // 주소
    daddr: string = '';

    delYn:string = 'N';
}

export interface MemberBasicInfo {
    empno: string;
    hnglNm: string;
    roleNm?:string;
    teamNm?: string;

}