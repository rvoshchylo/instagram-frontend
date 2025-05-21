export function formatCaption(text: string): string {
  return text
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')
    .replace(/@([\w\d_.]+)/g, (_, username) => {
      return `<a href="https://www.instagram.com/${username}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">@${username}</a>`;
    })
    .replace(/#([\w\d_]+)/g, (_, hashtag) => {
      return `<a href="https://www.instagram.com/explore/tags/${hashtag}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">#${hashtag}</a>`;
    });
}
