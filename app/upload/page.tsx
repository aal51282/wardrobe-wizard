"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Upload.module.css';

export default function UploadClothingPage() {
  const router = useRouter();
  
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ category, color, size, brand, image });

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
        <label className={styles.inputLabel} htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

        <label className={styles.inputLabel} htmlFor="color">Color</label>
        <input
          type="text"
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.inputField}
        />

        <label className={styles.inputLabel} htmlFor="size">Size</label>
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={styles.dropdown}
        >
          <option value="">Select a size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <label className={styles.inputLabel} htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.inputField}
        />

        <label className={styles.inputLabel} htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          className={styles.inputField}
        />

        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      <button onClick={() => router.push('/user-view')} className={styles.backButton}>Back</button>
    </div>
  );
}
