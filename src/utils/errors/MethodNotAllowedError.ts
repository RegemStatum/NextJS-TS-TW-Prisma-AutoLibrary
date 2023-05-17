import CustomApiError from "./CustomApiError";

class MethodNotAllowedError extends CustomApiError {
  constructor(msg: string) {
    super(msg);
    this.statusCode = 405;
  }
}

export default MethodNotAllowedError;
