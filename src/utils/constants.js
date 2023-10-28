import { format } from 'date-fns';


export const BASE_API = "http://192.168.50.220:9006/r"
export const BASE_API_PUBLIC = "http://127.0.0.1:8000"


// export const BASE_API = "https://syzapiback.syzapi.com/r"
// export const BASE_API_PUBLIC = "https://syzapiback.syzapi.com"

export const TOKEN = "token";

export function fDateTime(date, newFormat) {
    const fm = newFormat || 'dd MMM yyyy p';
    return date ? format(new Date(date), fm) : '';
  }
