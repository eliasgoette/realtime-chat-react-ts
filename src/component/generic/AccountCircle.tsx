import React, { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import styles from "./AccountCircle.module.css";
import { firebaseSignOut, getAuthState, googleSignIn } from "../../services/auth";
import { User } from "firebase/auth";

const AccountCircle: FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser]: [User | null, Dispatch<SetStateAction<User | null>>] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = getAuthState((user) => {
            setIsAuthenticated(user !== null);
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleAuthAction = async () => {
        if (isAuthenticated) {
            await firebaseSignOut();
        } else {
            await googleSignIn();
        }
    };

    return (
        <div className={styles.accountCircle} onClick={handleAuthAction}>
            <div className={styles.photoArea}>
                {isAuthenticated && currentUser?.photoURL ? (
                    <img className={styles.profilePhoto} src={currentUser.photoURL} alt="Profile photo"/>
                ) : (
                    <div></div>
                )}
            </div>
            <a>{isAuthenticated ? 'Sign out' : 'Sign in'}</a>
        </div>
    );
};

export default AccountCircle;
