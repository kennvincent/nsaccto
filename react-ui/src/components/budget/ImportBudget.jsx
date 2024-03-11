import axios from "axios";
import React, { useState } from "react";
import axiosClient from "../../axios-client";

export default function ImportBudget() {
    const [selectedFile,setSelectedFile] =useState(null);

    var file;
    const onFileChange = (e)=>{
        file =e.target.files[0];
       
        console.log(file);

    }

    const onClickUpload = async ()=>{
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axiosClient.post('/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }

        
        // axiosClient.post(`/import`,file).then(res =>{
        //    alert(res.data.message);
        // });
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
                        name="file"
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
