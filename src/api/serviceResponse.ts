import * as ResponseDefinition from '@/definitions/responseDefinition';

export function showResponse(res: any): void {
  // console.log(res.data['responseCode'] + " : " + res.data['responseMessage']);
  // console.log(res.data['errorsMessage']);
}

export function ok(code: number): boolean {
  return code == ResponseDefinition.RESPONSE_CODE_OK;
}

export function created(code: number): boolean {
  return code == ResponseDefinition.RESPONSE_CODE_CREATED;
}

export function badRequest(code: number): boolean {
  return code == ResponseDefinition.RESPONSE_CODE_BAD_REQUEST;
}

export function noContent(code: number): boolean {
  return code == ResponseDefinition.RESPONSE_CODE_NO_CONTENT;
}

export function verifyStatusResponse(status: number) {
  if (status == 403) {
    localStorage.clear();
    alert('Su sesión ha finalizado.');
  } 
}