export {
  GetResponse,
  PostResponse,
  PutResponse,
  PatchResponse,
  DelResponse,
  DelResponse as DeleteResponse,
  PublicGetResponse,
  PublicPostResponse,
} from "../api/server/server-fetch";

type QueryValue = string | number | boolean | undefined | null;

export function withQuery(
  path: string,
  params?: Record<string, QueryValue> | object,
): string {
  if (!params) return path;

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }

  const query = search.toString();
  return query ? `${path}?${query}` : path;
}
