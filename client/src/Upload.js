import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const Upload = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    totalAmount: "",
    writeoffAmount: "",
    extractedText: "",
  });

  const [jwt, setJwt] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const fileInputRef = useRef(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNDk5ZDFhNy04ZWFkLTQ1MGItYTNiYi1kNjRjZjZjZDc0NjciLCJlbWFpbCI6ImNoYXNlbTEyMzRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjdiMWM2ZWQ3ZTU3ZmY3YTQyY2JhIiwic2NvcGVkS2V5U2VjcmV0IjoiMmQ5Y2U3YmUyN2FiZDg0ZjU5YjhmZGEyNjk4NmY1OTVjOGY3YWFjMzMxOWM2MjJkNmIxNTVlMjI1MzRkNGIxNSIsImV4cCI6MTc1OTE1Mzg2MH0.v4o6o2__cVMwXUP4OxHb4mG93MvU-3RRJZWTsSwXHh0",
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
        console.log("JWT received:", data.JWT);
        return data.JWT;
      } else {
        console.error("Failed to get JWT:", data);
      }
    } catch (error) {
      console.error("Error creating API key:", error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFile(selectedFile);
        setImage(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreview(imageUrl);
        processImage(selectedFile);
        setIsImageSelected(true);
    } else {
        setIsImageSelected(false);
    }
};

  const processImage = (file) => {
    setLoading(true);
    Tesseract.recognize(
      file,
      "eng", // Specify the language
      {
        logger: (m) => console.log(m), // Optional: to log the progress
      }
    )
      .then(({ data: { text } }) => {
        setExtractedText(text); // Set the extracted text
        setLoading(false); // Stop loading indicator
        handleExtractedText(text); // Handle the extracted text
      })
      .catch((err) => {
        console.error("OCR Error:", err);
        setLoading(false);
      });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  const uploadFormData = async (jwt) => {
    if (!jwt) {
      console.error("No JWT available. Create API key first.");
      return;
    }

    console.log("Uploading form data with JWT:", jwt);

    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    console.log("Uploading form data...");
    const form = new FormData();
    form.append("name", formData.name);
    form.append("vendor", formData.vendor);
    form.append("date", formData.date);
    form.append("totalAmount", formData.totalAmount);
    form.append("writeoffAmount", formData.writeoffAmount);
    form.append('file', file);

    // Convert date to a Blob (could be a string or JSON representation)
    const dateBlob = new Blob([formData], { type: "text/plain" });
    form.append("finalFile", dateBlob, "finalFile.txt"); // Append date as a file

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: form,
    };

    try {
      const response = await fetch(
        "https://uploads.pinata.cloud/v3/files",
        options
      );
      const data = await response.json();
      if (data) {
        console.log("File upload response:", data);
        handleClear();
        alert("File uploaded successfully!");
    }
    } catch (error) {
      console.error("Error uploading form data:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Saving data...");
    const jwt = await createApiKey();
    console.log("JWT available after createApiKey:", jwt);
    await uploadFormData(jwt);
  };
  

  const handleClear = () => {
    setExtractedText("");
    setFormData({
        name: "",
        vendor: "",
        date: "",
        totalAmount: "",
        writeoffAmount: "",
        extractedText: "",
    });
    setFile(null);
    setPreview(null);
};

  const handleExtractedText = (text) => {

    const lines = text.split("\n");

    const amountRegex =
      /(?:[$€£¥₹]?\d{1,3}(?:,\d{3})*(?:\.\d{2})?)|(?:\d{1,3}(?:,\d{3})*(?:\.\d{2})?[$€£¥₹]?)/;
    const dateRegex =
      /(?:\b(?:0?[1-9]|[12][0-9]|3[01])[-\/.](?:0?[1-9]|1[0-2])[-\/.](?:\d{4})\b)|(?:\b(?:0?[1-9]|1[0-2])[-\/.](?:0?[1-9]|[12][0-9]|3[01])[-\/.](?:\d{4})\b)|(?:\b\d{4}[-\/.](?:0?[1-9]|1[0-2])[-\/.](?:0?[1-9]|[12][0-9]|3[01])\b)|(?:\b(?:[1-9]|[12][0-9]|3[01]) (?:January|February|March|April|May|June|July|August|September|October|November|December) (?:\d{4})\b)|(?:\b(?:January|February|March|April|May|June|July|August|September|October|November|December) (?:[1-9]|[12][0-9]|3[01]), (?:\d{4})\b)/;
    const name = lines[0];

    // Match common fields with regex
    const amountMatch = text.match(amountRegex);
    const dateMatch = text.match(dateRegex);
    const nameMatch = text.match(name);

    console.log(amountMatch, "amountMatch");
    console.log(dateMatch, "dateMatch");
    console.log(nameMatch, "nameMatch");

    // Other lines as notes
    const remainingText = text
      .replace(amountMatch, "")
      .replace(dateMatch, "")
      .replace(nameMatch, "");

    setFormData({
      name: nameMatch ? nameMatch[0] : "",
      date: dateMatch ? dateMatch[0] : "",
      totalAmount: amountMatch ? amountMatch[0] : "",
      notes: remainingText || remainingText ? remainingText[0] : "",
    });
  };

  const parseText = (text) => {
    const lines = text.split("\n");
    const data = {
      name: lines[0] || "",
      date: lines[1] || "",
      company: lines[2] || "",
      notes: lines.slice(3).join(" ") || "",
    };
    return data;
  };

  return (
    <div className="upload-form">
      <div className="columns-container">
        <div className="upload-column">
          <div className="upload-column-child">
            <button
              type="button"
              className="upload-button"
              onClick={handleButtonClick}
            >
              Business Receipt
            </button>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
          <div className="image-preview">
            <h3>Image Preview:</h3>
            {preview ? (
              <img src={preview} alt="Preview" className="image-preview-img" />
            ) : (
              "Please upload a purchase receipt and verify the data for your tax records"
            )}
          </div>
        </div>
        {loading && <p>Processing image, please wait...</p>}
        <form onSubmit={handleSave}>
          <div className="form-column">
            <h2>Upload Form</h2>
            <form>
              <div className="form-row">
                <label>Vendor:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <label>Date:</label>
                <input
                  type="text"
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
              <p className="extracted-text">{"Extracted Text: "}</p>
              <label className="form-row-label">
                <textarea
                  name="extractedText"
                  value={extractedText}
                  onChange={(e) => setExtractedText(e.target.value)} // Allow user to edit the text
                  rows="6"
                  cols="50"
                  className="extracted-text-area"
                />
              </label>
              <br />

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
                  className={`save-button ${!isImageSelected ? "disabled" : ""}`}
                  onClick={handleSave}
                  disabled={!isImageSelected}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
