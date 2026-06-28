import { useAuth } from "./auth/useAuth";

export function useApi() {
  return {
    auth: useAuth(),
  };
}
