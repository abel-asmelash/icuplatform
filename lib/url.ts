import qs from "query-string";

interface FormUrlQueryParams {
  params: string;
  key: string;
  value: string;
}

interface RemoveKeysFromUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function formUrlQuery({ params, key, value }: FormUrlQueryParams) {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
}

export function removeKeysFromUrlQuery({
  params,
  keysToRemove,
}: RemoveKeysFromUrlQueryParams) {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => delete queryString[key]);

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
}
