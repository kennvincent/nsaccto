import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const BudgetAugmentationEdit = () => {
    const location = useLocation();
    const win = window.sessionStorage;
    let augmentationid = win.getItem('augmentationid');
    // let augmentationid = location.state.augmentationid;
    
  return (
    <div>BudgetAugmentationEdit {augmentationid}</div>

  )
}

export default BudgetAugmentationEdit