import type { Framework } from './types';


export const VERSIONS: Record<Framework, readonly string[]> = {
  angular: ["1.1.1", "1.2.1", "1.3.3"],
  react: ["2.1.2", "3.2.4", "4.3.1"],
  vue: ["3.3.1", "5.2.1", "5.1.3"],
} as const;


export const DUPLICATE_EMAIL = "test@test.test";
 

export const MAX_HOBBY_MONTHS = 12;