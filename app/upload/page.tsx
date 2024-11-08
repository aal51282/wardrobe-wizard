import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UploadClothing.module.css';

export default function UploadClothingPage() {
  const router = useRouter();

  // State for each input field
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents page reload

    // Log the input data
    console.log({
      category,
      color,
      size,
      brand,
      image: image ? image.name : null,
    });

    // Clear the input fields
    setCategory('');
    setColor('');
    setSize('');
    setBrand('');
    setImage(null);
  };

  return (
    <div className={styles.uploadClothingContainer}>
      <h1>Upload Clothing</h1>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        {/* Category Dropdown */}
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        >
          <option value="">Select a category</option>
          <option value="Shirt">Shirt</option>
          <option value="Sweater">Sweater</option>
          <option value="Jacket">Jacket</option>
          <option value="Pants">Pants</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
          <option value="Skirt">Skirt</option>
          {/* Add more categories as needed */}
        </select>

        {/* Color Input */}
        <label htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter color"
          className={styles.input}
        />

        {/* Size Dropdown */}
        <label htmlFor="size">Size</label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={styles.input}
        >
          <option value="">Select a size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        {/* Brand Input */}
        <label htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Enter brand"
          className={styles.input}
        />

        {/* Image Upload */}
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className={styles.input}
        />

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Upload Item
        </button>
      </form>

      {/* Navigation Buttons */}
      <div className={styles.navigationButtons}>
        <button onClick={() => router.push('/user-view')} className={styles.backButton}>
          Back
        </button>
        <button onClick={() => router.push('/product')} className={styles.continueButton}>
          Continue
        </button>
      </div>
    </div>
  );
}
