import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export function getAttachmentFileName(headers: HttpHeaders): string | undefined {
  const cdValue = headers.get('Content-Disposition');
  if (cdValue) {
    // const cdRegex = /filename[^;=\n]*=(?:(\\?['"])(?<name>.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i;
    // const match = cdRegex.exec(cdValue);
    // return match?.groups?.name;

    const cdRegex = /filename=\"(.*)\"/i;
    const match = cdRegex.exec(cdValue);
    return match?.[1];
  }

  return undefined;
}

export function addQueryParam(name: string, value: any): string {
  if (value !== null && value !== undefined) {
    return Array.isArray(value) ?
      value.map(v => `${encodeUriQuery(name)}=${encodeUriQuery(v)}`).join('&') :
      `${encodeUriQuery(name)}=${encodeUriQuery(value)}`;
  } else {
    return '';
  }
}

export function serializeQueryParams(params: { [key: string]: any }): string {
  const strParams: string[] = Object.entries(params).map(([name, value]) => addQueryParam(name, value));
  return strParams.length ? `?${strParams.join('&')}` : '';
}

export function encodeUriQuery(s: string): string {
  return encodeURIComponent(s)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%3B/gi, ';');
}

export function isHttpError<T>(err: Error, checkStatus: number, checkContent?: (error: T) => boolean): boolean {
  if (err instanceof HttpErrorResponse) {
    if (checkContent) {
      const errorContent = err.error as T;
      if (err.status === checkStatus && errorContent && checkContent(errorContent)) {
        return true;
      }
    } else {
      return err.status === checkStatus;
    }
  }

  return false;
}

export function isHttpErrorString(err: Error, checkStatus: number, checkContent: string): boolean {
  return isHttpError<string>(err, checkStatus, e => e === checkContent);
}
