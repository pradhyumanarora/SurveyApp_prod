import React, { useState } from "react";

const Owlvit = () => {
  const [targetImage, setTargetImage] = useState(null);
  const [queryImages, setQueryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(null);

  const handleTargetImageChange = (e) => {
    setTargetImage(e.target.files[0]);
  };

  const handleQueryImagesChange = (e) => {
    const files = e.target.files;
    setQueryImages([...queryImages, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("targetImage", targetImage);

    queryImages.forEach((image, index) => {
      formData.append(`queryImage${index + 1}`, image);
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming the backend returns the base64-encoded image in 'image' field
      setResultImage(data.image);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="fw-bold mb-4">Symbol Detection with OWL-VIT</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="targetImage" className="form-label">
            Choose your Target Image:
          </label>
          <input
            type="file"
            className="form-control"
            id="targetImage"
            onChange={handleTargetImageChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="queryImages" className="form-label">
            Choose your Query Images (multiple allowed):
          </label>
          <input
            type="file"
            className="form-control"
            id="queryImages"
            onChange={handleQueryImagesChange}
            multiple
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Upload Files
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {resultImage && (
        <div className="mt-4">
          <h2>Result Image</h2>
          <img src={resultImage} alt="Result" className="img-fluid" />
        </div>
      )}
    </div>
  );
};

export default Owlvit;
