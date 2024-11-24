import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";


// Initialize multer to handle file uploads in memory (this avoids saving files directly to disk)
const storage = multer.memoryStorage();
const upload = multer({ storage }); // 'image' is the field name in your form


// Middleware to wrap multer's functionality
export const multerMiddleware = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: "Failed to upload file" });
      }
      next();
    });
  };

  // Helper to run middleware in Next.js
export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};