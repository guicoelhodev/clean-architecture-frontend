import { HttpClientSpy } from "../../mocks/mockHttpClient";
import { RemoteAuthentication } from "./remoteAuthentication";
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteAuthentication(url, httpClientSpy);

  return {
    sut,
    httpClientSpy,
  };
};

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { httpClientSpy, sut } = makeSut(url);
    await sut.auth();

    expect(httpClientSpy.url).toBe(url);
  });
});
