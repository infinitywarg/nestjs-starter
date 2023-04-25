import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private myName: string;

  constructor(private readonly configService: ConfigService) {
    this.myName = this.configService.getOrThrow<string>('MY_NAME');
  }

  getHealth(): any {
    Logger.log(`AppService: executing health check api for ${this.myName}`);
    return { health: 'ok', name: this.myName };
  }
}
