import { User } from "@prisma/client";

export interface UserPayload {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

declare global {
  namespace Express {
    interface Users extends User {}
  }
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}
