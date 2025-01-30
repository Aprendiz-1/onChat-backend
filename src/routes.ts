import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { CreateConversationController } from "./controllers/conversation/CreateConversationController";
import { ListMessagesController } from "./controllers/messages/ListMessagesController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import passport from "passport";

const router = Router();

router.post('/register', new CreateUserController().handle);

router.post('/login', new AuthUserController().handle);

router.get('/get-user', passport.authenticate('jwt', {session: false}), new DetailUserController().handle);

router.get('/contacts', new ListUserController().handle);

router.post('/conversation', new CreateConversationController().handle);

router.get('/messages', new ListMessagesController().handle);

export { router };