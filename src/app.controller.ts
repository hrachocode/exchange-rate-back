import { Controller, Get, Query } from '@nestjs/common';
import { captureRejectionSymbol } from 'events';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/api/quote')
  getHello(
    @Query('from_currency_code') from_currency_code: string,
    @Query('to_currency_code') to_currency_code: string,
    @Query('amount') amount: number,
  ): {} {
    return this.appService.getHello(
      from_currency_code,
      to_currency_code,
      amount,
    );
  }
}
