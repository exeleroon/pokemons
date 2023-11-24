import React, {useEffect, useState} from 'react';

interface IPagination {
    totalItemsCount: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({totalItemsCount, pageSize, currentPage, onPageChange}) => {
    const [pages, setPages] = useState<number[]>([]);
    const pagesCount = Math.ceil(totalItemsCount / pageSize);

    let start = 0;
    let end = 0;

    useEffect(() => {
        updatePagination(currentPage);
    }, [])

    const updatePagination = (curPage: number) => {
        // if (totalElements <= pageSize) {
        //     isNeeded = false;
        //     return;
        // }
        // isNeeded = true;

        if (pagesCount < 6) {
            start = 1;
            end = pagesCount;

        } else {
            if (curPage < 4) {
                start = 1;
                end = 5;

            } else if (curPage + 3 > pagesCount) {
                start = pagesCount - 4;
                end = pagesCount;
            } else {
                start = curPage - 2;
                end = curPage + 2;
            }
        }

        const pages = [];

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        setPages(pages);
    }

    const doChange = (page:number) => {
        onPageChange(page);
        updatePagination(page);
    }

    return (
        <div className={'d-flex justify-content-center'}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {(currentPage > 1) && <li className={`pagination-item`} onClick={() => {
                        doChange(1);
                    }}>
                        <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>}

                    {pages.map(p =>
                        <li className={(currentPage === p ? `active ` : '') + `page-item`} key={p}
                            onClick={() => {
                                doChange(p);
                            }}>
                            <span className="page-link">
                                {p}
                            </span>
                        </li>)
                    }

                    {(currentPage < pagesCount) &&
                        <li className={`pagination-item`} style={{cursor: 'pointer'}} onClick={() => {
                            doChange(pagesCount);
                        }}>
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;