export function isYouTubeUrl(url: string) {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

export function getYouTubeEmbedUrl(url: string) {
  if (url.includes("embed")) return url;

  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  const params = new URL(url).searchParams;
  const id = params.get("v");
  return id ? `https://www.youtube.com/embed/${id}` : "";
}
