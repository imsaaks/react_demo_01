import { Pageable, PageConstant } from '@common/component/paging/Pageable.ts'
import { ConfigConstants } from '@common/constants/ConfigConstants.ts';

export class CommonUtil {

    /**
     * cleanNullKet
     */
    static cleanNullKet(obj: any): any {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
                delete obj[propName];
            }
        }
        return obj;
    }

    static cloneCleanNullKet(obj: any): any {
        const clone: any = structuredClone(obj);
        for (const propName in clone) {
            if (clone[propName] === null || clone[propName] === undefined || clone[propName] === '') {
                delete clone[propName];
            }
        }
        return clone;
    }

    static convertDateToShort(dateStr: string, dashValue?: string): string {
        let result: string = '';
        let dash: string = '-';
        if (dashValue) {
            dash = dashValue;
        }
        if (dateStr) {
            const ymdString: string = dateStr.replace(/[^0-9]/gi, '');
            result = ymdString.substr(0,4) + dash + ymdString.substr(4,2) + dash + ymdString.substr(6,2);
        }
        return result;
    }


    static getPagingList(pageable: Pageable): number[] {
        if (!pageable) {
            return [];
        }
        let totalPages: number = 0;
        let currentPage: number = 0;

        if (pageable['totalPages']) {
            totalPages = pageable['totalPages'];
        }
        if (pageable['number']) {
            currentPage = pageable['number'];
        }
        if (totalPages === 0) {
            return [];
        }

        const pages: number[] = [];
        let startPage: number = 0;
        let endPage: number = 0;

        const ac: number = Math.floor(currentPage / 10);
        startPage = (ac * 10) + 1;
        if (totalPages === startPage) {
            endPage = (ac * 10) + 1;
        } else if(totalPages > startPage) {
            if (totalPages - startPage >= 10) {
                endPage = (ac * 10) + 10;
            } else {
                endPage = (ac * 10) + ((totalPages - startPage)) +1;
            }
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    static getPageable(data: any): Pageable {
        let pageable: Pageable = new Pageable();
        if (data.pageable) {
            pageable = data.pageable;
            // number 특이사항
            pageable.number = data.number;
        }
        if (data.first) {
            pageable.first = data.first;
        }
        if (data.last) {
            pageable.last = data.last;
        }
        if (data.numberOfElements) {
            pageable.numberOfElements = data.numberOfElements;
        }
        if (data.size) {
            pageable.size = data.size;
        }
        if (data.totalElements) {
            pageable.totalElements = data.totalElements;
        }
        if (data.totalPages) {
            pageable.totalPages = data.totalPages;
        }
        return pageable;
    }

    static getAllCommonCodeParams(): any {
        const params: any = {};
        params.pageSize = PageConstant.USER_PAGE_SIZE;
        params.sortBy = 'sortOrd';
        params.sortOrder = 'asc';
        params.useYn = 'Y';
        params.deleteYn = 'N';
        return params;
    }

    static getCommonCodeList(key: string, isAddNull?: boolean): any[] {
        const comCodeObj: string|null = localStorage.getItem(ConfigConstants.COMMON_CODE_KEY_NAME);
        const list: any[] = []
        if (comCodeObj) {
            if (isAddNull) {
                list.push({value: '', label: '전체'})
            }
            const comCodeList: any[] = JSON.parse(comCodeObj);
            comCodeList.map((item: any) => {
                if (item.codeGroup === key) {
                    list.push({value: item.code, label: item.codeNm});
                }
            })
        }
        return list;
    }

    static makeUserMenuList(data: any): any[] {
        const menus: any[] = [];
        let l: number = 0;
        let m: number = 0;
        let s: number = 0;
        data.map((item: any) => {
            if (item.pgmLevel) {
                if (Number(item.pgmLevel) === 1) {
                    item.level = 0;
                    item.id = 'l_' +  l
                    item.isOpen = true;
                    item.isMatching = true;
                    item.children = [];
                    menus.push(item);
                    l++;
                }
            }
        });

        menus.map((parent: any) => {
            data.forEach((item: any) => {
                if (item.pgmLevel) {
                    if (Number(item.pgmLevel) === 2 && parent.pgmCd === item.hirPgmCd) {
                        item.level = 1;
                        item.id = parent.id + '_' + m
                        item.isOpen = true;
                        item.isMatching = true;
                        item.children = [];
                        parent.children.push(item);
                        m++;
                    }
                }
            });
        });

        menus.forEach((litem: any) => {
            if (litem.children) {
                litem.children.forEach((mitem: any) => {
                    data.forEach((item: any) => {
                        if (item.pgmLevel) {
                            if (Number(item.pgmLevel) === 3 && mitem.pgmCd === item.hirPgmCd) {
                                item.level = 2;
                                item.id = mitem.id + '_' + s;
                                item.isOpen = true;
                                item.isMatching = true;
                                mitem.children.push(item);
                                s++;
                            }
                        }
                    });

                })
            }
        });


        return menus;
    }


    static getUserMenuList(): any[] {
        const menuObj: string|null = localStorage.getItem(ConfigConstants.USER_MENU_KEY_NAME);
        const list: any[] = []
        if (menuObj) {
            return JSON.parse(menuObj);
        }
        return list;
    }
}