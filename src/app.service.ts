import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Redis from 'ioredis';

const redis = new Redis({
  'port': 6379,
  'host' : '127.0.0.1'
})

@Injectable()
export class AppService {
  fetchForms = async (url) => {
    const result = await axios
      .get(
        `${url}`,
        {
          headers: {
            Authorization: 'Bearer KmFmRhJk-8Gbeoui88FhLapa9jZRieKyp_ZriuHlofs',
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
    const url = 'https://cdn.contentful.com/spaces/0uk0rl0l436k/environments/dynamic-journey-mock/entries?sys.id=2bmfj97ce1TI85Ph9OXkjS'
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  public async fetchBlogData() {
    const url = 'https://cdn.contentful.com/spaces/0uk0rl0l436k/environments/dynamic-journey-mock/entries?sys.id=WTjIgfi3Pm5tx4imQy1Bx'
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  public async fetchBlogModalData() {
    const url = 'https://cdn.contentful.com/spaces/0uk0rl0l436k/environments/dynamic-journey-mock/entries?sys.id=6PgH6RSPDRSNheV4sDVeKc'
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  public async getBlogHeaderData() {
    const url = 'https://cdn.contentful.com/spaces/0uk0rl0l436k/environments/dynamic-journey-mock/entries?sys.id=5ShF6frts704Hs7JeSgezu'
    const fetchData = await this.fetchForms(url)
    return fetchData
  }

  

  public async fetchSignUpFormData() {

    let cacheEntry = await redis.get('signUpFormData')
    if (cacheEntry) {
     const fetchData = JSON.parse(cacheEntry)
      return {...fetchData, 'source' :'redis'}

    }
    const url = 'https://cdn.contentful.com/spaces/0uk0rl0l436k/environments/dynamic-journey-mock/entries?sys.id=3FlD6Q9CUIdP4AkM7GZFwn'
    const fetchData = await this.fetchForms(url)
    redis.setex('signUpFormData', 400, JSON.stringify(fetchData))

    return {...fetchData, 'source' :'db'}
  }

  public async fetchLogInFormData() {
    const url = 'https://cdn.contentful.com/spaces/0uk0rl0l436k/environments/dynamic-journey-mock/entries?sys.id=53ngfQ9Xum7iM96bn87AGv'
    const fetchData = await this.fetchForms(url)
    return fetchData
  }
 
}
