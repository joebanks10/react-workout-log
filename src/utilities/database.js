import Firebase from 'firebase';
import moment from 'moment';

class Database {
	constructor() {
    // set up Firebase
    var config = {
      apiKey: "AIzaSyC02BDarkzp-jMztlBI32cQOlEZvVluv7M",
      authDomain: "workout-log-a0c07.firebaseapp.com",
      databaseURL: "https://workout-log-a0c07.firebaseio.com",
      storageBucket: "workout-log-a0c07.appspot.com",
      messagingSenderId: "141837028377"
    };

    this.app = Firebase.initializeApp(config);
    this.db = Firebase.database();
    this.workouts = this.db.ref('workouts/');
  }

  addWorkout({ date = false, exercises = [] }) {
    var ref = this.workouts.push(),
        id = ref.key;

    date = date || moment().format('YYYY-MM-DD');

    ref.set({ 
      id,
      date,
      exercises
    });
  }

  updateWorkout(id, data) {
    this.db.ref('workouts/' + id).update({
      ...data
    });
  }

  deleteWorkout(id) {
    this.db.ref('workouts/' + id).remove();
  }
}

export default Database;