export function getCookie(name: string) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const cookieValues = cookie.split("=");

    if (cookieValues[0] === name) return cookieValues[1];
  }
}
