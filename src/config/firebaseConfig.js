import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyDBLDYHALTWPQbmf8CRBILHWP6n9WdCIO0',
    authDomain: 'free-developer-resources-19062.firebaseapp.com',
    projectId: 'free-developer-resources-19062'
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;