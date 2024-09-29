import React, { useState, useRef } from "react";

const Mileage = () => {
  const [formData, setFormData] = useState({
    date: "",
    vehicle: "",
    startMiles: "",
    stopMiles: "",
    totalTrips: "",
  });

  const formDataIsFull = Object.values(formData).every((val) => val);

  const [jwt, setJwt] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createApiKey = async () => {
    console.log("Creating API Key...");
    const options = {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDk5ZDFhNy04ZWFkLTQ1MGItYTNiYi1kNjRjZjZjZDc0NjciLCJlbWFpbCI6ImNoYXNlbTEyMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjgxMjUzNjY2ZWE1ZWI1MjUwOGNlIiwic2NvcGVkS2V5U2VjcmV0IjoiYzc5YjVlYTc4ZGMxZWNiOGRjNjVmMzMxNWJkNTRhZDE1M2E3ZWYwYjEwMjA4MWNhNjcwNmY0NjE3MjJhZGNlYyIsImV4cCI6MTc1OTEwOTA3MH0.e4yIYrCMhrVSvb60lL9At4BUCF-Yglt3rGDGkcAFrqE",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyname: formData.name || "Test Key",
        permissions: {
          admin: true,
        },
        maxUses: 2,
      }),
    };
    try {
      const response = await fetch(
        "https://api.pinata.cloud/v3/pinata/keys",
        options
      );
      const data = await response.json();
      console.log("API Key Response:", data);
      if (data.JWT) {
        setJwt(data.JWT);
        console.log("JWT received:", data.JWT);
      } else {
        console.error("Failed to get JWT:", data);
      }
    } catch (error) {
      console.error("Error creating API key:", error);
    }
  };

  const MileageFormData = async () => {
    if (!jwt) {
      console.error("No JWT available. Create API key first.");
      return;
    }

    if (!file) {
      console.error("No file selected for Mileage.");
      return;
    }

    console.log("Mileageing form data...");
    const form = new FormData();
    form.append("date", formData.date);
    form.append("vehicle", formData.vehicle);
    form.append("startMiles", formData.startMiles);
    form.append("stopMiles", formData.stopMiles);
    form.append("totalTrips", formData.totalTrips);
    form.append("file", file);

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: form,
    };

    try {
      const response = await fetch(
        "https://Mileages.pinata.cloud/v3/files",
        options
      );
      const data = await response.json();
      console.log("File Mileage response:", data);
    } catch (error) {
      console.error("Error Mileageing form data:", error);
    }
  };

  const handleSave = async () => {
    console.log("Saving data...");
    await createApiKey();
    await MileageFormData();
  };

  const handleClear = () => {
    setFormData({
      name: "",
      vendor: "",
      date: "",
      totalAmount: "",
      writeoffAmount: "",
    });
  };

  return (
    <div className="mileage-form">
      <div className="columns-container">
        <div className="form-column">
          <h2>Mileage Form</h2>
          <form>
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
              <label>Vehicle: </label>
              <input
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Start Miles: </label>
              <input
                type="number"
                name="startMiles"
                value={formData.startMiles}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Stop Miles: </label>
              <input
                type="number"
                name="stopMiles"
                value={formData.stopMiles}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label>Total Trips: </label>
              <input
                type="number"
                name="totalTrips"
                value={formData.totalTrips}
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
                className={`save-button ${!formDataIsFull ? "disabled" : ""}`}
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

export default Mileage;
