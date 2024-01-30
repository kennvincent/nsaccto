import React from 'react'



const Pagination = ({totalPosts,postsPerPage,onPageClicked}) => {
    let pages = [];
 
    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pages.push(i);
    }

    const handlePageClick =(e)=>{
      e.preventDefault();
      let pageClick = parseInt(e.target.value) + 1;
      ()=>onPageClicked(pageClick);
     
    }

  return (
    
    <div className='mt-2'>
    
        {pages.map((page,index)=>{
            return <button key={index} value={index} className='btn text-blue-600 border mr-1'
            onClick={()=>onPageClicked(index + 1)}>{page}</button>
        })}
    </div>
  );
}

export default Pagination