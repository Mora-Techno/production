import { AuthService, type PickLogin, type TResponse } from '@repo';

class AuthApi {
  Login(payload: PickLogin): Promise<TResponse<unknown>> {
    return AuthService.Login(payload);
  }
}

export default new AuthApi();
