import { proxyServer } from "./proxyServer";

export default async function fetchFromURL(url) {
  const response = await fetch(`${proxyServer}${url}`);
  return response;
}
