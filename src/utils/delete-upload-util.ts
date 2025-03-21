import { NextFunction } from "express";
import { unlink, access, constants  } from "fs";
import path from "path";

export const deleteUpload = (upload_url: string, next: NextFunction) => {
  unlink(upload_url, (err) => {
    if (err) next(err);
  });
};

// export const deleteUpload = (upload_url: string, next: NextFunction) => {
//   const filePath = path.resolve(upload_url);
//   console.log(`Deleting file at: ${filePath}`);

//   access(filePath, constants.F_OK, (accessErr) => {
//     if (accessErr) {
//       console.error(`File does not exist: ${filePath}`);
//       next(accessErr);
//       return;
//     }

//     unlink(filePath, (unlinkErr) => {
//       if (unlinkErr) {
//         console.error(`Error deleting file: ${unlinkErr.message}`);
//         next(unlinkErr);
//       } else {
//         console.log(`File deleted successfully: ${filePath}`);
//       }
//     });
//   });
// };
