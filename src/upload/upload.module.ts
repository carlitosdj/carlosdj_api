import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("subindo arquivo...")  
    cb(null, '../../../../carlosdj.com.br/files');
  },
  filename: (req, file, cb) => {
    //cb(null, `${Date.now()}_${file.originalname}`);
    cb(
      null,
      `${Date.now()}-${Math.random()}${path.extname(file.originalname)}`,
    );
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
