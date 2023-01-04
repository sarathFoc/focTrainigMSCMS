
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {

  private logger = new Logger('AppController');

  constructor(private readonly appService: AppService) {}

  @MessagePattern('getLoginPageData')
  async fetchFormData() {
    this.logger.log('fetch from cms');
    return this.appService.fetchFormData()
  }

  
  
  @MessagePattern('getSignUpPageData')
  async fetchSignUpFormData() {
    this.logger.log('fetch signUp form from cms');
    return this.appService.fetchSignUpFormData()
  }

  @MessagePattern('getLogInPageData')
  async fetchLogInFormData() {
    this.logger.log('fetch signUp form from cms');
    return this.appService.fetchLogInFormData()
  }
  

  @MessagePattern('getBlogPageData')
  async fetchBlogData() {
    this.logger.log('fetch from cms');
    return this.appService.fetchBlogData()
  }

  @MessagePattern('getBlogModalData')
  async fetchBlogModalData() {
    this.logger.log('fetch from cms');
    return this.appService.fetchBlogModalData()
  }

  

  @MessagePattern('getBlogHeaderData')
  async getBlogHeaderData() {
    this.logger.log('fetch Blog header from cms');
    return this.appService.getBlogHeaderData()
  }

  
}
