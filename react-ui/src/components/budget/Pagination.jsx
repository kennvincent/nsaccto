import React from 'react'



const Pagination = ({totalPosts,postsPerPage,onPageClicked,curPage}) => {
    let pages = [];
 
    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pages.push(i);
    }

    let currentpage;
    const handlePageClick =(e)=>{

      e.preventDefault();
      let pageClick = parseInt(e.target.value) + 1;
      currentpage=pageClick;
      ()=>onPageClicked(pageClick);
   
    }

  return (
    
    <div className='mt-2'>
    
        {pages.map((page,index)=>{
            return <button key={index} value={index} className='btn text-blue-600 border mr-1'
            onClick={()=>onPageClicked(index + 1)}  style={{
              margin: '0 5px',
              padding: '10px',
              backgroundColor: curPage === index + 1 ? '#ffcc66' : 'white',
            }}>{page}</button>
        })}
    </div>
  );
}

export default Pagination