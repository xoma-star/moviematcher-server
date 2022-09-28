import { Injectable } from '@nestjs/common';
import axios from "axios";
import * as sharp from 'sharp'

@Injectable()
export class ImageService {
    async get(path: string){
        const image = await axios.get(path, {responseType: "arraybuffer"})
        return await sharp(image.data).toColourspace('rgb32').jpeg({quality: 20, force: false, progressive: true}).toBuffer()
    }
}
