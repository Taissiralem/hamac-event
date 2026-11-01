import { mergeContent } from "./merge";
import { fetchPageData } from "@/lib/api";

export { mergeContent };

export async function getContent(key) {
  return mergeContent(key, await fetchPageData(key));
}
