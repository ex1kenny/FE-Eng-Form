import { DUPLICATE_EMAIL } from "../constants"; 


export function isDuplicateEmail(email?: string): boolean {
  return (email ?? "").trim().toLowerCase() === DUPLICATE_EMAIL;
}