import React, { useState, useRef  } from "react";

const TravelUpload = () => {
  const [formData, setFormData] = useState({
    category: '',
    vendor: '',
    date: '',
    totalAmount: '',
  });

  const formDataIsFull = Object.values(formData).every((val) => val);


  const [jwt, setJwt] = useState('');
  const [file, setFile] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NmJjODdmNy0xMzcwLTQ4MjctYTI4OS1mZmRjZjkyMGU5ZmMiLCJlbWFpbCI6Imx1aWFtaTE0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ODc1MjkwYWQ1ODg2OTBiZDAzYyIsInNjb3BlZEtleVNlY3JldCI6ImIzN2RjNTVmMWY2ZjY2MmFjMTllN2EwNGQ0ZGE5ZGJkNTY1M2I2ODNjYjFkNWEyM2U5NTUxMmI2NzllYmI3OTMiLCJleHAiOjE3NTkxMjgyMTJ9.cgm3sNsMefq62h1bcbi0TzGf0of6agqalNcXMWE0bsM',
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
        // form.append('file', file);

        // Convert date to a Blob (could be a string or JSON representation)
        const dateBlob = new Blob([formData], { type: 'text/plain' });
        form.append('finalFile', dateBlob, 'finalFile.txt'); // Append date as a file

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

  const handleSave = async (e) => {
    console.log('Saving data...');
    e.preventDefault();
    await createApiKey();
    await uploadFormData();
    };

  const handleClear = () => {
    setFormData({
      category: '',
      vendor: '',
      date: '',
      totalAmount: '',
    });
  };

  return (
    <div className="travel-receipt">
      <div className="columns-container">
        <div className="form-column">
            <h2>Receipt Form</h2>
              <form>
              <div className="form-row">
                <label>Category:</label>
                <select name="category" value={formData.category} onChange={handleChange} className="styled-select">
                    <option value="">-- Select a category --</option> {/* Default option */}
                    <option value="category1">Gas Receipts</option>
                    <option value="category2">Air Travel</option>
                    <option value="category3">Hotels</option>
                    <option value="category4">Meals</option>
                </select>
              </div>
              <div className="form-row">
                  <label>Vendor:</label>
                  <input
                      type="text"
                      name="vendor"
                      value={formData.vendor}
                      onChange={handleChange}
                  />
              </div>
              <div className="form-row">
                  <label>Date:</label>
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
                      className={`save-button ${!formDataIsFull ? 'disabled' : ''}`}
                      onClick={handleSave}
                      disabled={!formDataIsFull}
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

export default TravelUpload;
