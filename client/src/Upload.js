import React, { useState, useRef  } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";

const Upload = () => {
  const [formData, setFormData] = useState({
    name: '',
    vendor: '',
    date: '',
    totalAmount: '',
    writeoffAmount: '',
  });
  const [jwt, setJwt] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createApiKey = async () => {
    console.log('Creating API Key...');
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDk5ZDFhNy04ZWFkLTQ1MGItYTNiYi1kNjRjZjZjZDc0NjciLCJlbWFpbCI6ImNoYXNlbTEyMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjgxMjUzNjY2ZWE1ZWI1MjUwOGNlIiwic2NvcGVkS2V5U2VjcmV0IjoiYzc5YjVlYTc4ZGMxZWNiOGRjNjVmMzMxNWJkNTRhZDE1M2E3ZWYwYjEwMjA4MWNhNjcwNmY0NjE3MjJhZGNlYyIsImV4cCI6MTc1OTEwOTA3MH0.e4yIYrCMhrVSvb60lL9At4BUCF-Yglt3rGDGkcAFrqE',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyname: formData.name || 'Test Key',
        permissions: {
          admin: true
        },
        maxUses: 2
      }),
    }
    try {
        const response = await fetch('https://api.pinata.cloud/v3/pinata/keys', options);
        const data = await response.json();
        console.log('API Key Response:', data);
        if (data.JWT) {
          setJwt(data.JWT);
          console.log('JWT received:', data.JWT);
        } else {
          console.error('Failed to get JWT:', data);
        }
      } catch (error) {
        console.error('Error creating API key:', error);
      }
    };

    const handleImageChange = (e) => 
    {
        const file = e.target.files[0];
        if (file) 
        {
        setImage(file);
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setIsImageSelected(true); // Enable the save button
        }
        else 
        {
            setIsImageSelected(false); // Disable the save button if no file
        }
    };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

    const uploadFormData = async () => 
    {
        if (!jwt) {
        console.error('No JWT available. Create API key first.');
        return;
        }

        if (!file) {
            console.error('No file selected for upload.');
            return;
        }

        console.log('Uploading form data...');
        const form = new FormData();
        form.append('name', formData.name);
        form.append('vendor', formData.vendor);
        form.append('date', formData.date);
        form.append('totalAmount', formData.totalAmount);
        form.append('writeoffAmount', formData.writeoffAmount);
        form.append('file', file);

        const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        body: form,
        };

        try {
        const response = await fetch('https://uploads.pinata.cloud/v3/files', options);
        const data = await response.json();
        console.log('File upload response:', data);
        } catch (error) {
        console.error('Error uploading form data:', error);
        }
    };

  const handleSave = async () => {
    console.log('Saving data...');
    await createApiKey();
    await uploadFormData();
    };

  const handleClear = () => {
    setFormData({
      name: '',
      vendor: '',
      date: '',
      totalAmount: '',
      writeoffAmount: '',
    });
  };
  
    return (
        <div className="upload-form">
            <div className="columns-container">
                {/* First Column */}
                <div className="upload-column">
                    <button type="button" className="upload-button" onClick={handleButtonClick}>Upload Receipt</button>
                    <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }}/>
                    {preview && (
                    <div>
                        <h3>Image Preview:</h3>
                        <img src={preview} alt="Preview" style={{ width: '100px', height: '100px' }} />
                    </div>
                )}
                </div>
                {/* Second Column */}
                <div className="form-column">
                    <h2>Upload Form</h2>
                    <form>
                        <div className="form-row">
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="form-row">
                            <label>Vendor: </label>
                            <input
                                type="text"
                                name="vendor"
                                value={formData.vendor}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="form-row">
                            <label>Date: </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="form-row">
                            <label>Total Amount: </label>
                            <input
                                type="number"
                                name="totalAmount"
                                value={formData.totalAmount}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="form-row">
                            <label>Writeoff Amount: </label>
                            <input
                                type="number"
                                name="writeoffAmount"
                                value={formData.writeoffAmount}
                                onChange={handleChange}
                            />
                        </div>
    
                        <div className="buttons">
                            <button
                                type="button"
                                className="clear-button"
                                onClick={handleClear}
                            >
                                Clear
                            </button>
    
                            <button
                                type="button"
                                className={`save-button ${!isImageSelected ? 'disabled' : ''}`}
                                onClick={handleSave}
                                disabled={!isImageSelected}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Upload;
