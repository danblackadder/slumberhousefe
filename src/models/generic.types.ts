export type ActionMap<T> = {
  [Key in keyof T]: T[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: T[Key];
      };
};

export interface IPagination {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
