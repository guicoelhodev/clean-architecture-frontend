import { AuthenticationParams } from "@/domain/useCases/authentication";
import { HttpPostClient } from "@/data/protocols/http/httpPostClient";
import { HttpStatusCode } from "@/data/protocols/http/httpResponse";
import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });

    switch(httpResponse.statusCode) {
      case HttpStatusCode.unathorized: 
        throw new InvalidCredentialsError();
      default:
        return Promise.resolve()
    }
  }
}
