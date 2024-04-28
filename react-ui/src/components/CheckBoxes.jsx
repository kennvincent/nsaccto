
import React, { useState } from 'react';

const CheckBoxes = () => {
    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: 'Checkbox 1', checked: false },
        { id: 2, label: 'Checkbox 2', checked: false },
        { id: 3, label: 'Checkbox 3', checked: false },
        // Add more checkboxes as needed
      ]);
    
      // Function to handle individual checkbox change
      const handleCheckboxChange = (id) => {
        setCheckboxes((prevCheckboxes) =>
          prevCheckboxes.map((checkbox) =>
            checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
          )
        );
      };
    
      // Function to handle "Check All" checkbox change
      const handleCheckAllChange = (e) => {
        console.log(e);
        setCheckboxes((prevCheckboxes) =>
          prevCheckboxes.map((checkbox) => ({ ...checkbox, checked: true }))
        );
      };

      
  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={(e)=>handleCheckAllChange(e.target.value)}
          checked={checkboxes.every((checkbox) => checkbox.checked)}
        />
        Check All
      </label>
      <ul>
        {checkboxes.map((checkbox) => (
          <li key={checkbox.id}>
            <label>
              <input
                type="checkbox"
                checked={checkbox.checked}
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
              {checkbox.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CheckBoxes
