import CustomApiError from "./CustomApiError";

class ConflictRequestError extends CustomApiError {
  constructor(msg: string) {
    super(msg);
    this.statusCode = 409;
  }
}

export default ConflictRequestError;
