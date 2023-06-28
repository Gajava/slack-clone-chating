
import React, { useState } from "react";
import firebase from '../../../server/firebase';
import "firebase/database";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { SET_USER } from "../../../store/actiontype";

const ImageUploader = ({ onSave, onCancel, }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImages] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewImages(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        onSave(imageData);
        setSelectedFile(null);
        setPreviewImages(null);
        
        const databaseRef = firebase.database().ref("images");
        const newImageRef = databaseRef.push();
        newImageRef
          .set({
            imageData: imageData,
          })
          .then(() => {
            console.log("image data stored in firebase");
          })
          .catch((error) => {
            console.log("error storing in image data in firebase", error);
          });
      };

      reader.readAsDataURL(selectedFile);
    }
   
  };
  const handleCancelClick = () => {
    setSelectedFile(null);
    setPreviewImages(null);
    onCancel();
  
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewImage && (
        <div>
          <p>selected File: {selectedFile.name}</p>
          <img src={previewImage} alt="preview" />
          
        </div>
      )}
      <button onClick={handleUploadClick}>Upload</button>&nbsp; &nbsp;
      <button onClick={handleCancelClick}>Cancel</button>
    </div>
  );
};

export default ImageUploader;