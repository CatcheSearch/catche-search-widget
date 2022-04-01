export interface Result {
  id: string;
  url: string;
  title: string;
  text: string;
}

export function escapeRegExp(str:string) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}