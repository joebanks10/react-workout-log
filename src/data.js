import moment from 'moment';

const WORKOUTS = [
  { 
    id: 1, 
    name: 'My Birthday', 
    type: 'birthday party', 
    host: 'Joe Banks',
    start: moment(),
    end: moment().add(1, 'days'),
    guests: [
      { name: 'Gaby Soto' },
      { name: 'Angela Banks' }
    ],
    location: '857 Delmas Ave., San Jose, CA 95125',
    message: 'Bring your own beer.'
  },
  { 
    id: 2, 
    name: 'My Wedding', 
    type: 'wedding ceremony', 
    host: 'Joe Banks',
    start: moment(),
    end: moment().add(1, 'days'),
    guests: [
      { name: 'Gaby Soto' },
      { name: 'Angela Banks' }
    ],
    location: '857 Delmas Ave., San Jose, CA 95125',
    message: 'Bring your own beer.'
  },
  { 
    id: 3, 
    name: 'Halloween', 
    type: 'birthday party', 
    host: 'Joe Banks',
    start: moment(),
    end: moment().add(1, 'days'),
    guests: [
      { name: 'Gaby Soto' },
      { name: 'Angela Banks' }
    ],
    location: '857 Delmas Ave., San Jose, CA 95125',
    message: 'Bring your own beer.'
  }
];

export default WORKOUTS;