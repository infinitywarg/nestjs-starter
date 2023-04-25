import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private myName: string;

  constructor(private readonly configService: ConfigService) {
    this.myName = this.configService.getOrThrow<string>('MY_NAME');
  }

  getHealth(): any {
    return { health: 'ok', name: this.myName };
  }
}
