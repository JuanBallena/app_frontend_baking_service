import Vue from 'vue';

export function getUrlApi(): string {
  return Vue.prototype.$config.BASE_URL_API;
}

export function getAuthorization(): object {
  return {
    headers: {
      'Authorization': localStorage.getItem('token')
    }
  };
}

// return 'http://appbakingservice-env.eba-pqemiiwa.us-east-2.elasticbeanstalk.com';