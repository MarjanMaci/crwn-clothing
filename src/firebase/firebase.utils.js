import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBWhXi6ZGlKDZpunJSfokzTXXJHzIoeh7s",
    authDomain: "crwn-shop-1db88.firebaseapp.com",
    projectId: "crwn-shop-1db88",
    storageBucket: "crwn-shop-1db88.appspot.com",
    messagingSenderId: "470117888334",
    appId: "1:470117888334:web:e0816a6caea185bbfeee1f",
    measurementId: "G-0RRRWGS9DK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error catching user' + error.message)
        }


    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
