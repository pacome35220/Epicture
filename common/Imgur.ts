import ApiBuilder from './ApiBuilder';
import { routes } from './Routes';

export default class extends ApiBuilder {

  clientId: string;
  access_token: string;

  constructor(clientId: string, access_token: string) {
    super({
      config: {
        baseURL: 'https://api.imgur.com',
        timeout: 10000,
      },
      routes,
      headers: () => {
        let bearer = `Bearer ${this.access_token}`;
        return {
          clientId: { 'Authorization': this.access_token ? bearer : `Client-ID ${this.clientId}` },
          bearer: { 'Authorization': bearer },
          json: { 'Accept': 'application/vnd.api+json' },
        };
      }
    });

    this.clientId = clientId;
    this.login(access_token);
  }

  login(access_token: string) {
    this.access_token = access_token;
  }

  logout() {
    this.access_token = null;
  }

  toggleVote = async (vote, currentValue, id) => {
    if (currentValue == vote) {
      await this.call.unvote({ galleryHash: id });
      return null;
    }
    await this[`${vote}vote`]({ galleryHash: id });
    return vote;
  }

  getAuthUrl(redirectUrl) {
    return `https://api.imgur.com/oauth2/authorize?response_type=token` +
      `&client_id=${this.clientId}` +
      `&redirect_uri=${redirectUrl}`
  }
}
