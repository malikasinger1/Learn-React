import { Observable } from "rxjs"
import { AuthActions } from "./../action/auth";
import { firebaseService } from './../../service/firebaseService';

export class AuthEpic {

    static signup = (action$) =>
        action$.ofType(AuthActions.SIGNUP_START)
            .switchMap(({ payload }) => {

                console.log("Credentials ", payload);
                return Observable.fromPromise(firebaseService.signup(payload.email, payload.password))

                    .map((authUser) => {
                        return {
                            type: AuthActions.SIGNUP_SUCCESSFUL,
                            payload: authUser
                        };
                    })
                    .catch(function (error) {
                        console.error(error.code, error.message);
                        return Observable.of({
                            type: AuthActions.SIGNUP_REJECTED,
                            payload: error
                        });
                    })
            })
}

