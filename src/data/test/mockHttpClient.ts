import { HttpPostClient } from "../protocols/http/httpPostClient";

export class HttpClientSpy implements HttpPostClient {
  url?: string;
  async post(url: string): Promise<void> {
    this.url = url;
  }
}
