import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PostBookMarkDto, editDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import {GetUser} from 'src/auth/decorator';


@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmark: BookmarkService) {}
  @Get('/')
  getBookmarks(@GetUser('id') userId: number) {
    console.log({ userId });
    return this.bookmark.findAllBookmarks(userId);
  }
  @Get('/single')
  getBookMarkById(
    @GetUser('id') userId: number,
    @Body() body: { bookmarkId: number },
  ) {
    return this.bookmark.findBookmarkById(userId, body.bookmarkId);
  }
  @Delete('/')
  deleteBookMark(
    @GetUser('id') userId: number,
    @Body() body: { bookmarkId: number },
  ) {
    return this.bookmark.deleteBookmark(userId, body.bookmarkId);
  }
  @Post('/')
  createBookmark(
    @Body() bodyDto: PostBookMarkDto,
    @GetUser('id') userId: number,
  ) {
    return this.bookmark.createBookmark(bodyDto, userId);
  }
  @Put('/')
  editBookmark(@Body() bodyDto: editDto) {
    return this.bookmark.editBookmark(bodyDto);
  }
}
