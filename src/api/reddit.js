const baseUrl = "https://www.reddit.com";

export function getAllRedditPosts() {
  return getRedditData("/r/all.json");
}

export function searchReddit(string) {
  if (string === "") return getAllRedditPosts();

  return getRedditData(`/search.json?q=${string.trim()}`);
}

export function getPostComment(url){
  return getRedditData(url.replace(/.$/, ".json"))
}

async function getRedditData(string) {
  try {
    const response = await fetch(baseUrl + string);

    if (!response.ok) throw Error("fetch error");

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
