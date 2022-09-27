import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import axios from "axios";

@Controller('image')
export class ImageController {
    @Get(':path')
    async get(@Param('path') path: string, @Req() req: Request, @Res() res: Response){
        try {
            const a = await axios.get(path, {responseType: "arraybuffer"})
            res.contentType('image/jpeg')
            res.send(a.data)
        }catch (e) {throw e}
    }
}
