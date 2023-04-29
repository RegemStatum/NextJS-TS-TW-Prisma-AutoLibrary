import CustomApiError from "./CustomApiError";

class NotFoundError extends CustomApiError {
  constructor(msg: string) {
    super(msg);
    this.statusCode = 404;
  }
}

export default NotFoundError;
