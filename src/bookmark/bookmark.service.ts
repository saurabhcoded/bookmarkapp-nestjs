import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostBookMarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async findAllBookmarks() {
    const bookmarks = await this.prisma.bookmark.findMany();
    return bookmarks;
  }
  async createBookmark(body: PostBookMarkDto) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: { userId: body.userId },
    });
    return bookmarks;
  }
}
