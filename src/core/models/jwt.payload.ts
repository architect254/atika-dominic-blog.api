import { User } from "@core/models/user/user.entity";

export interface JwtPayload {
  user: User;
}
