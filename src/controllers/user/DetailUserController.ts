import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailUserService";
import { UserProps } from "./CreateUserController";

interface DetailUserProps extends UserProps {
  _id: string;
}

class DetailUserController {
  async handle(req: Request, res: Response): Promise<any> {
    try {
      const get_user = req.user as DetailUserProps;
      const user_id = get_user._id;

      const detailUser = new DetailUserService();
      const user = await detailUser.execute(user_id);

      return res.json(user);
    } catch (error) {
      return res.status(500).send(`Erro de servidor: ${error}`);
    }
  }
}

export { DetailUserController };
