export const api = process.env.NEXT_PUBLIC_GATE_API ?? "";
export const version = process.env.NEXT_PUBLIC_VERSION_API ?? "/api";
export const baseurl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:5000";

export function joinUrl(...parts: Array<string | undefined | null>) {
  return parts
    .filter(Boolean)
    .map((p) => String(p))
    .map((p) => {
      let s = p;
      while (s.startsWith("/")) s = s.slice(1);
      while (s.endsWith("/")) s = s.slice(0, -1);
      return s;
    })
    .join("/");
}
