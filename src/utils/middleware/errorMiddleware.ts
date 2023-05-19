import { NextApiRequest, NextApiResponse } from "next";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

const errorMiddleware = (handler: Handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (e: any) {
      console.error(e);
      res
        .status(e.statusCode || 500)
        .json({ msg: e.message || "Server error" });
    }
  };
};

export default errorMiddleware;
