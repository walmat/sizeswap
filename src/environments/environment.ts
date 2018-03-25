import { fireBaseKey } from 'private/firebase-key';

export const environment = {
  production: false,
  // firebase: {
  //   ...fireBaseKey
  // }
    firebase: {
        apiKey: 'AIzaSyB08FZ4nd2_1kenBqJzv7t-u0f0q2W0UIo',
        authDomain: 'size-swap.firebaseapp.com',
        databaseURL: 'https://size-swap.firebaseio.com',
        projectId: 'size-swap',
        storageBucket: 'size-swap.appspot.com',
        messagingSenderId: '108876455375'
    }
};
