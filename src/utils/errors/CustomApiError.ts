class CustomApiError extends Error {
  statusCode: number;
  constructor(msg: string) {
    super(msg);
    this.statusCode = 500;
  }
}

export default CustomApiError;
