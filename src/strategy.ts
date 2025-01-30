import { Strategy } from 'passport-jwt';
import { User } from './models/User';
import { JwtFromRequestFunction } from 'passport-jwt';

type StrategyProps = {
    jwtFromRequest: JwtFromRequestFunction<any>;
    secretOrKey: string;
}

type OptionsProps = {
    opts: StrategyProps;
}

const passJwtStrategy = (opts: OptionsProps) => {
    new Strategy(opts, async (jwtPayload, done) => {
        let user_id = jwtPayload.id as string;

        const user = await User.findById(user_id, '--password');

        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}

export { passJwtStrategy };