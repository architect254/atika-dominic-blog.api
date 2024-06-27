import { diskStorage, File } from 'multer';
import { extname, join } from 'path';

export const configureFileStorage = (prefix: string) => {
  return {
    storage: diskStorage({
      destination: (req: Request, file: File, cb) => {
        cb(null, join(__dirname, '../../../uploads'));
      },
      filename: (req: Request, file: File, cb) => {
        let fileExt = extname(file.originalname);
        cb(null, `${prefix}-${Date.now() + fileExt}`);
      },
    }),
  };
};
