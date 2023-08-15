import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PostBookMarkDto } from './dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}
  @Get('/')
  getBookmarks() {
    return this.bookmark.findAllBookmarks();
  }
  @Post('/')
  createBookmark(@Body() bodyDto: PostBookMarkDto) {
    return this.bookmark.findAllBookmarks();
  }
}
