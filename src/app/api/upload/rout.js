import fs from "fs";
import path from "path";
import formidable from "formidable";
import clientPromise from "../../library/mongodb";

export const config = {
  api: {
    bodyParser: false, // Formidable ашиглах тул bodyParser-г идэвхгүй болгоно
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Хавтас үүсгэх
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed" });
      }

      const { originalFilename, filepath } = files.file;
      const newFilePath = path.join(uploadDir, originalFilename);

      fs.renameSync(filepath, newFilePath);

      // MongoDB-д замыг хадгалах
      const client = await clientPromise;
      const db = client.db("your-database-name");
      await db.collection("files").insertOne({
        filename: originalFilename,
        path: `/uploads/${originalFilename}`,
        uploadedAt: new Date(),
      });

      res.status(200).json({ message: "File uploaded successfully", path: `/uploads/${originalFilename}` });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
