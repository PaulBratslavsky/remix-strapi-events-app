export function getStrapiURL(path = '') {
  return `${process.env.STRAPI_URL || 'http://localhost:1337'}${path}`;
}

export function getStrapiMedia(path: string | null, url: string) {
  if (path == null) {
      return null;
  }

  // Return the full URL if the media is hosted on an external provider
  if (path.startsWith('http') || path.startsWith('//')) {
      return url;
  }

  // Otherwise prepend the URL path with the Strapi URL
  return `${url}${path}`;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
export function formatTime(timeString: string) {
  let tempTime = timeString.split(":");
  let dt = new Date();
  dt.setHours(Number(tempTime[0]));
  dt.setMinutes(Number(tempTime[1]));
  const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
  return dt.toLocaleTimeString('en-US', options);
}
