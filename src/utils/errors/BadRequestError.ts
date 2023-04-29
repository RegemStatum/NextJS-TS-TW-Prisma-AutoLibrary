import CustomApiError from "./CustomApiError";

class BadRequestError extends CustomApiError {
  constructor(msg: string) {
    super(msg);
    this.statusCode = 400;
  }
}

export default BadRequestError;
