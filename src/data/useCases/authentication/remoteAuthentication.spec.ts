import { HttpPostClient } from "../../protocols/http/httpPostClient";
import { RemoteAuthentication } from "./remoteAuthentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    class HttpClientSpy implements HttpPostClient {
      url?: string;
      async post(url: string): Promise<void> {
        this.url = url;
      }
    }

    const url = "any_url";
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);

    await sut.auth();

    expect(httpClientSpy.url).toBe(url);
  });
});
