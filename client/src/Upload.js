import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";

const Upload = (props) => {
  const { isDonation } = props;
  const [formData, setFormData] = useState({
    vendor: "",
    date: "",
    totalAmount: "",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3NmJjODdmNy0xMzcwLTQ4MjctYTI4OS1mZmRjZjkyMGU5ZmMiLCJlbWFpbCI6Imx1aWFtaTE0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1ODc1MjkwYWQ1ODg2OTBiZDAzYyIsInNjb3BlZEtleVNlY3JldCI6ImIzN2RjNTVmMWY2ZjY2MmFjMTllN2EwNGQ0ZGE5ZGJkNTY1M2I2ODNjYjFkNWEyM2U5NTUxMmI2NzllYmI3OTMiLCJleHAiOjE3NTkxMjgyMTJ9.cgm3sNsMefq62h1bcbi0TzGf0of6agqalNcXMWE0bsM",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      processImage(file); // Process the image for text extraction
      setIsImageSelected(true); // Enable the save button
    } else {
      setIsImageSelected(false); // Disable the save button if no file
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

  const uploadFormData = async () => {
    if (!jwt) {
      console.error("No JWT available. Create API key first.");
      return;
    }

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
    // form.append('file', file);

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
      console.log("File upload response:", data);
    } catch (error) {
      console.error("Error uploading form data:", error);
    }
  };

  const handleSave = async (e) => {
    console.log("Saving data...");
    console.log("Image saved!");
    e.preventDefault();
    console.log("Extracted Text Saved:", extractedText);
    await createApiKey();
    await uploadFormData();
  };

  const handleClear = () => {
    setExtractedText(""); // Clear the text area
    setFormData({
      vendor: "",
      date: "",
      totalAmount: "",
      extractedText: "",
    });
  };

  // Function to parse the extracted text and map it to the form fields
  const handleExtractedText = (text) => {
    // const parsedData = parseText(text);

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
      vendor: nameMatch ? nameMatch[0] : "",
      date: dateMatch ? dateMatch[0] : "",
      totalAmount: amountMatch ? amountMatch[0] : "",
      notes: remainingText || remainingText ? remainingText[0] : "",
    });
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
            <h3>Upload Receipt</h3>
            <form>
              <div className="form-row">
                <label>{isDonation ? "Organization:" : "Vendor:"}</label>
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
