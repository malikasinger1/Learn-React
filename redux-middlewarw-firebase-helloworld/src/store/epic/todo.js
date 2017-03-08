import { Observable } from "rxjs";

import { TodoAction } from "./../action/todo";
import * as firebase from 'firebase';

const ref = firebase.database().ref('todoApp/todo');

export class TodoEpic {

    static addTodo = (action$) =>
        action$.ofType(TodoAction.ADD_TODO)
            .switchMap(({ payload }) => {

                console.log("adding started");
                return Observable.fromPromise(ref.push(payload))
                    .map((x) => {
                        if (!x) {
                            return {
                                type: TodoAction.ADD_TODO_DONE
                            };
                        } else {
                            return {
                                type: TodoAction.NULL,
                                payload: {}
                            };
                        }
                    })
            })  
}