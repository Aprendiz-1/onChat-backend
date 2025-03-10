import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { ListUserController } from "./controllers/user/ListUserController";
import { CreateConversationController } from "./controllers/conversation/CreateConversationController";
import { ListMessagesController } from "./controllers/messages/ListMessagesController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { ListConversationsController } from "./controllers/conversation/ListConversationsController";
import { EditUserController } from "./controllers/user/EditUserController";
import { GetConversationController } from "./controllers/conversation/GetConversationController";
import passport from "passport";
import { SearchUserController } from "./controllers/user/SearchUserController";

const router = Router();
const passportAuth = passport.authenticate('jwt', {session: false});

router.post('/register', new CreateUserController().handle);

router.post('/login', new AuthUserController().handle);

router.get('/get-user', passportAuth, new DetailUserController().handle);

router.put('/update-user', passportAuth, new EditUserController().handle);

router.get('/search-user', passportAuth, new SearchUserController().handle);

router.get('/contacts', passportAuth, new ListUserController().handle);

router.post('/create-conversation', passportAuth, new CreateConversationController().handle);

router.post('/get-conversation', passportAuth, new GetConversationController().handle);

router.get('/list-conversations', passportAuth, new ListConversationsController().handle);

router.get('/messages', passportAuth, new ListMessagesController().handle);

export { router };