import React from 'react';

function Pagination({pageInfo, handlePageChange}) {
    
    return (
        <nav className="flex justify-center mb-2" aria-label="Page navigation">
            <ul className="inline-flex -space-x-px text-sm">
                <li >
                <a href="#" className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight  bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-blue-800  
                ${!pageInfo.has_pre ? 'pointer-events-none text-gray-500' : 'text-blue-500'} `} 
                onClick={() => handlePageChange(pageInfo.current_page - 1)}
                >上一頁</a>
                </li>
                {
                Array.from({length: pageInfo.total_pages}).map((_, index) => (
                <li key={index}>
                    <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight  border border-gray-300  ${ pageInfo.current_page === index + 1 ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-800' }`}
                    onClick={() => handlePageChange(index+1)}
                    >
                    {index + 1}
                    </a>
                </li>
                ))
                }
                <li>
                    <a href="#" className={`flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-blue-800
                    ${!pageInfo.has_next ? 'pointer-events-none text-gray-500' : 'text-blue-500'}`}
                    onClick={() => handlePageChange(pageInfo.current_page + 1)}
                    >下一頁</a>
                </li>
            </ul>
        </nav>
    )
}


export default Pagination;