import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostBookMarkDto, editDto } from './dto';
import slugify from 'slugify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async findAllBookmarks(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
    if (bookmarks.length) {
      return { message: 'Bookmarks Found', bookmarks };
    } else {
      return { message: 'No Bookmarks Found' };
    }
  }
  async findBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        userId,
        id: bookmarkId,
      },
    });
    if (bookmark) {
      return { message: 'Bookmark Found', bookmark };
    } else {
      return { message: 'No Bookmark Found' };
    }
  }
  async deleteBookmark(userId: number, bookmarkId: number) {
    try {
      const bookmark = await this.prisma.bookmark.delete({
        where: {
          userId,
          id: bookmarkId,
        },
      });
      return { message: 'Bookmark Deleted Successfully' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException(
            "Bookmark trying to delete Doesn't Exist",
          );
        }
      } else {
        return { message: 'Oops Something went Wrong' };
      }
    }
  }
  async createBookmark(body: PostBookMarkDto, userId: number) {
    try {
      let slug = slugify(body.title).toLowerCase();
      const bookmarks = await this.prisma.bookmark.create({
        data: {
          userId,
          title: body.title,
          slug,
          description: body.description,
          link: body.link,
        },
      });
      return { message: 'Bookmark Added Successfully', bookmarks };
    } catch (error) {
      return { message: 'Oops Something Went Wrong !' };
    }
  }
  async editBookmark(body: editDto) {
    try {
      body.slug=slugify(body.slug).toLowerCase()
      const updateBookmark = await this.prisma.bookmark.update({
        data: body,
        where: { id: body.id },
      });
      console.log(updateBookmark);
      return updateBookmark;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException(
            "Bookmark trying to Edit Doesn't Exist",
          );
        }
      } else {
        return { message: 'Oops Something went Wrong' };
      }
      console.log(error);
    }
  }
}
