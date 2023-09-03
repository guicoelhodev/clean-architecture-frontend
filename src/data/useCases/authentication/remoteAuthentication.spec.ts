import { HttpClientSpy } from "../../test/mockHttpClient";
import { RemoteAuthentication } from "./remoteAuthentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url: string = "any_url"): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteAuthentication(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = "other_url";
    const { httpClientSpy, sut } = makeSut(url);
    await sut.auth();

    expect(httpClientSpy.url).toBe(url);
  });
});
