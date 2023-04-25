import { Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger('BooksService');

  create(createBookDto: CreateBookDto) {
    try {
      this.logger.log('returning all books');
      return 'This action adds a new book';
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
