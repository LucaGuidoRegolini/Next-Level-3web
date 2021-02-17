import { strict } from 'assert';
import firebase from './firebase'

function post(name:string , data:object) {
  let db = firebase.database().ref()
  let db_id = firebase.database().ref('/orphanage').push(data)

  let updates:any = {};
  updates['/orphanage/' + data] = data;
  db.update(updates)

  db_id.remove()
}

export {post}