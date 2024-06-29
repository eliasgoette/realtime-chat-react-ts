import React, { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./AccountCircle.module.css";
import { firebaseSignOut, getAuthState, googleSignIn } from "../../services/auth";
import { writeUserData } from "../../services/database";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { database } from "../../services/firebase";

type UserData = {
    uid: string;
    username: string;
    email: string;
    photoUrl: string;
    chatIds: string[];
};

const AccountCircle: FC = () => {
    const [currentUserDoc, setCurrentUserDoc]: [UserData | null, Dispatch<SetStateAction<UserData | null>>] = useState<UserData | null>(null);

    useEffect(() => {
        const unsubscribe = getAuthState((user) => {
            if (user !== null) {
                const userRef = ref(database, `/users/${user.uid}`);
                onValue(userRef, (snapshot: DataSnapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const userDoc: UserData = {
                            uid: user.uid,
                            username: data.username,
                            email: data.email,
                            photoUrl: data.photoUrl,
                            chatIds: data.chatIds ?? []
                        };
                        setCurrentUserDoc(userDoc);
                    } else {
                        const newUserDoc: UserData = {
                            uid: user.uid,
                            username: user.displayName ?? '',
                            email: user.email ?? '',
                            photoUrl: user.photoURL ?? '',
                            chatIds: []
                        };
                        writeUserData(user.uid, newUserDoc.username, newUserDoc.email, newUserDoc.photoUrl, newUserDoc.chatIds);
                        setCurrentUserDoc(newUserDoc);
                    }
                });
            } else {
                setCurrentUserDoc(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleAuthAction = async () => {
        if (currentUserDoc) {
            await firebaseSignOut();
        } else {
            await googleSignIn();
        }
    };

    return (
        <div className={styles.accountCircle} onClick={handleAuthAction}>
            <div className={styles.photoArea}>
                {currentUserDoc ? (
                    <img className={styles.profilePhoto} src={currentUserDoc.photoUrl} alt="Profile photo" />
                ) : (
                    <div className={styles.placeholderPhoto}></div>
                )}
            </div>
            <p>{currentUserDoc ? 'Sign out' : 'Sign in'}</p>
        </div>
    );
};

export default AccountCircle;
