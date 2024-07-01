
import { DataSnapshot, Query } from "firebase/database";
import { database, ref, set, onValue, push } from "./firebase";

const writeUserData = (userId: string, name: string, email: string, imageUrl: string, initialChatIds: string[]) => {
    set(
        ref(database, 'users/' + userId), {
        username: name,
        email: email,
        photoUrl: imageUrl,
        chatIds: [...initialChatIds]
    });
}

const checkValue = (query : Query, callback : (snapshot : DataSnapshot) => void) => onValue(query, callback);

export default database;
export { writeUserData, checkValue, ref, set, push };