"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation
import styles from './Upload.module.css';

export default function UploadClothingPage() {
  const router = useRouter();

  // State hooks for managing form inputs
  const [category, setCategory] = useState(''); // Requirement: use state for new item 
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);

  // Function to handle form submission 
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents default form submission 
    console.log({ category, color, size, brand, image }); // Logs input data 

    // Clear the fields after submission 
    setCategory('');
    setColor('');
    setSize('');
    setBrand('');
    setImage(null);
  };

  return (
    <div className={styles.uploadContainer}>
      <h1 className={styles.pageTitle}>Upload Clothing</h1>
      <form onSubmit={handleSubmit}>
        {/* Category input with onChange handler */}
        <label className={styles.inputLabel} htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // onChange event
          className={styles.dropdown}
        >
          <option value="">Select a category</option>
          <option value="Shirt">Shirt</option>
          <option value="Sweater">Sweater</option>
          <option value="Jacket">Jacket</option>
          <option value="Pants">Pants</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
          <option value="Skirt">Skirt</option>
        </select>

        {/* Color input with onChange handler */}
        <label className={styles.inputLabel} htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)} // onChange event
          className={styles.inputField}
        />

        {/* Size input with onChange handler */}
        <label className={styles.inputLabel} htmlFor="size">Size</label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)} // onChange event 
          className={styles.dropdown}
        >
          <option value="">Select a size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        {/* Brand input with onChange handler */}
        <label className={styles.inputLabel} htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)} // onChange event
          className={styles.inputField}
        />

        {/* Image input with onChange handler */}
        <label className={styles.inputLabel} htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])} // onChange event
          className={styles.inputField}
        />

        {/* Submit button */}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      {/* Back button using Link component */}
      <Link href="/user-view">
        <button className={styles.backButton}>Back</button>
      </Link>
    </div>
  );
}
