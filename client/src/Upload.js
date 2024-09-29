import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";

const Upload = () => {

  const [formData, setFormData] = useState({});
  
    // Handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handler for saving the form (you can replace this with an API call)
    const handleSave = () => {
        console.log('Form Data:', formData);
        // Implement your save logic here, like sending data to a backend.
    };

    // Handler for clearing the form
    const handleClear = () => {
        setFormData({
            name: '',
            vendor: '',
            date: '',
            totalAmount: '',
            writeoffAmount: ''
        });
    };
  
  return (
    <div className="upload-form">
    <h2>Upload Form</h2>
    <form>
        <div>
            <label>Name: </label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
        </div>

        <div>
            <label>Vendor: </label>
            <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
            />
        </div>

        <div>
            <label>Date: </label>
            <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
        </div>

        <div>
            <label>Total Amount: </label>
            <input
                type="number"
                name="totalAmount"
                value={formData.totalAmount}
                onChange={handleChange}
            />
        </div>

        <div>
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
                className="save-button"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    </form>
</div>
  );
};

export default Upload;
