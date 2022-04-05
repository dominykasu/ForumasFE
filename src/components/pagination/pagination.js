import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate}) => {

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination d-flex align-items-center justify-content-center">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <div onClick={() => paginate(number)} className="page-link test2">
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;