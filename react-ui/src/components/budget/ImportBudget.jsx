import axios from "axios";
import React, { useState } from "react";
import axiosClient from "../../axios-client";

export default function ImportBudget() {
    const [selectedFile,setSelectedFile] =useState([]);

    var file;
    const onFileChange = (e)=>{
        //setSelectedFile(e.target.files[0]);
        file =e.target.files[0];
        console.log(file);
    }

    const onClickUpload = ()=>{

        
        axiosClient.post(`/import`,file).then(res =>{
           alert(res.data.message);
        });
    }

  return (
    <div>
        <div className='card w-[80rem]'>
            <div className='card-header'><h4>Import Yearly Budget</h4></div>
            <div className='card-body'>
                <div>
                    <h4>{selectedFile}</h4>
                <input
                        type="file"
                        onChange={onFileChange}
                        name="fileupload"
                    />
                    <button className='btn btn-primary btn-sm right-0 absolute mr-2 w-[150px]' 
                    onClick={onClickUpload}>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}
