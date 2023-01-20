import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import Redis from 'ioredis';

const redis = new Redis({
  'port': 6379,
  'host' : '127.0.0.1'
})

@Injectable()
export class AppService {
  private cmsAuthToken;
  private cmsFetchbBaseURL;
  constructor(private configService: ConfigService) {
  this.cmsAuthToken = this.configService.get<string>('cmsAuthToken');
  this.cmsFetchbBaseURL = this.configService.get<String>('cmsFetchbBaseURL')
    
  }


  fetchForms = async (url) => {
    console.log("cmsAuthToken",this.cmsAuthToken)
    const access_token =  this.cmsAuthToken
    const result = await axios
      .get(
        `${url}`,
        {
          headers: {
            Authorization: access_token,     
          },
        },
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => console.log('error', err));


    return result;
  };

  public async fetchFormData() {
    const url = `${this.cmsFetchbBaseURL}sys.id=2bmfj97ce1TI85Ph9OXkjS`
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  public async fetchBlogData() {
    const url = `${this.cmsFetchbBaseURL}sys.id=WTjIgfi3Pm5tx4imQy1Bx`
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  public async fetchBlogModalData() {
    const url = `${this.cmsFetchbBaseURL}sys.id=6PgH6RSPDRSNheV4sDVeKc`
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  public async getBlogHeaderData() {
    const url = `${this.cmsFetchbBaseURL}sys.id=5ShF6frts704Hs7JeSgezu`
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  

  public async fetchSignUpFormData() {

    let cacheEntry = await redis.get('signUpFormData')
    if (cacheEntry) {
     const fetchData = JSON.parse(cacheEntry)
      return {...fetchData, 'source' :'redis'}

    }
    const url = `${this.cmsFetchbBaseURL}sys.id=3FlD6Q9CUIdP4AkM7GZFwn`
    const fetchData = await this.fetchForms(url)
    redis.setex('signUpFormData', 400, JSON.stringify(fetchData))

    return {...fetchData, 'source' :'db'}
  }

  public async fetchLogInFormData() {    
    const url = `${this.cmsFetchbBaseURL}sys.id=53ngfQ9Xum7iM96bn87AGv`
    const fetchData = await this.fetchForms(url)
    return fetchData
  }
 
}
