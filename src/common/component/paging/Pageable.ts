export class PageConstant {
    static SIZE = 20;
    static USER_PAGE_SIZE: number = 99999;
}

export class Pageable {
    first: boolean =  false;
    last: boolean = false;
    paged: boolean = false;
    number: number = 0;
    numberOfElements: number = 0;
    size: number = PageConstant.SIZE;
    totalElements: number = 0;
    totalPages: number = 0;
    sort: any = null;
    unpaged: boolean = false;
}

export class PageViewSize {
    static pageViewSizeList: any[] = [
        {value: 20, label: '20 행'},
        {value: 40, label: '40 행'},
        {value: 60, label: '60 행'},
        {value: 100, label: '100 행'}
    ];
}

