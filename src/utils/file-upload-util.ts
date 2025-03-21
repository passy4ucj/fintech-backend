import { Request } from "express";
import { FileFilterCallback } from "multer";

export const imageFilter = (req: any, file: any, cb: any) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

export const pdfFilter = (req: any, file: any, cb: any) => {
  // Accept images only
  if (!file.originalname.match(/\.(pdf|docx)$/)) {
    req.fileValidationError = "Only PDF files are allowed!";
    return cb(new Error("Only PDF files are allowed!"), false);
  }
  cb(null, true);
};

export const pdfImageFilter = (req: any, file: any, cb: any) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|docx)$/)) {
    req.fileValidationError = "Only PDF files are allowed!";
    return cb(new Error("Only PDF files are allowed!"), false);
  }
  cb(null, true);
};

export const videoFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported File Format",
      },
      false
    );
  }
};

export const imageAndVideoFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: any
) => {
  const acceptedTypes = file.mimetype.split("/");

  if (acceptedTypes[0] === "image" || acceptedTypes[0] === "video") {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos formats allowed!"), false);
  }
};

export enum uploadType {
  image = "image",
  video = "video",
  file = "file",
}
