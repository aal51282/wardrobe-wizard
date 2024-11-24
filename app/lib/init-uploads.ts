import fs from "fs";
import path from "path";

export function initUploadsDirectory() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} 