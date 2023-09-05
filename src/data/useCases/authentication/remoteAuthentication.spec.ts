import { mockAuthentication } from '@/domain/mocks/mockAuthentication';
import { HttpClientSpy } from "@/data/mocks/mockHttpClient";
import { RemoteAuthentication } from '@/data/useCases/authentication/remoteAuthentication';
import { InvalidCredentialsError } from '@/domain/errors/InvalidCredentialsError';

import { faker } from '@faker-js/faker'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse';

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

  test("Should throw invalidCretendialsError if HttpPostClient returns 401", async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
});
