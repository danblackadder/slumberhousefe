export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export interface IPagination {
  totalDocuments: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
