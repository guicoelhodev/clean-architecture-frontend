import { mockAuthentication } from "../../../domain/mocks/mockAuthentication";
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
    await sut.auth(mockAuthentication());

    expect(httpClientSpy.url).toBe(url);
  });

  test("Should call HttpPostClient with correct body", async () => {
    const { httpClientSpy, sut } = makeSut();

    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpClientSpy.body).toEqual({
      email: authenticationParams.email,
      password: authenticationParams.password,
    })
  });
});
