import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {ImageService} from "./image.service";

@Controller('image')
export class ImageController {
    constructor(private imageService: ImageService) {}
    @Get(':path')
    async get(@Param('path') path: string, @Req() req: Request, @Res() res: Response){
        try {
            res.contentType('image/webp')
            res.send(await this.imageService.get(path))
        }catch (e) {throw e}
    }
}
