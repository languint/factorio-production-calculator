export function getCookie(name: string) {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const cookieValues = cookie.split("=");

    if (cookieValues[0] === name) return cookieValues[1];
  }
}

export function replacer(_key: unknown, value: object) {
  if(value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

interface cobject {
  dataType: "Map" | undefined;
  value: [];
}

export function reviver(_key: unknown, value: cobject) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}