import { HttpClientSpy } from "../../test/mockHttpClient";
import { RemoteAuthentication } from "./remoteAuthentication";

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = "any_url";
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteAuthentication(url, httpClientSpy);

    await sut.auth();

    expect(httpClientSpy.url).toBe(url);
  });
});
