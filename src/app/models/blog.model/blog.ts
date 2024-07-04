export interface Blog {
  id: number;
  username: string;
  text: string;
  dateCreated: Date;
}

export interface GenericResponse<T> {
  statusMessage: string;
  data: T;
  statusCode: number;
}

