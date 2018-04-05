import { initializeApp } from 'firebase';

const app = initializeApp({
	apiKey: "AIzaSyCcg1TFn28c9AE163A4PtiHDm3wSEl9Go4",
	authDomain: "vuejs-550e3.firebaseapp.com",
	databaseURL: "https://vuejs-550e3.firebaseio.com",
	projectId: "vuejs-550e3",
	storageBucket: "",
	messagingSenderId: "235697050064"
});

export const db = app.database();

export const namesRef = db.ref('names');

export const personRef = db.ref('person');

export const restaurantRef = db.ref('restaurants');

