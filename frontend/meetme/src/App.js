import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import eventA from './test.json';

var Monday = [
  {
  time: '09:30 - 10:00',
  name: 'Breakfast',
  people: ['Aaron Kaneti', 'Bradley Ramos'],
  location: 'home',
  description: '',
  },
  {
    time: '20:30 - 22:00',
    name: 'Dinner',
    people: ['Terry Tan', 'Amulya A'],
    location: 'diner',
    description: '',
  },
  {
    time: '21:30 - 22:00',
    name: 'Birthday Planning',
    people: ['Bradley Ramos', 'Danyil Pysmak'],
    location: 'home',
    description: '',
  },];
var Tuesday = [{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
  },
  {
    time: '11:00 - 11:50',
    name: 'Chem',
    people: ['Aaron Kaneti', 'Danyil Pysmak'],
    location: 'Tech',
    description: 'gen lec',
  },
];
var Wednesday = [{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
];
var Thursday = [{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
];
var Friday = [{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
];
var Saturday = [{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},
];
var Sunday = [{
  time: '11:00 - 11:50',
  name: 'Chem',
  people: ['Aaron Kaneti', 'Danyil Pysmak'],
  location: 'Tech',
  description: 'gen lec',
},];
var bringMonday = function Monday()
 {
   return Monday;
  };
function Event(time, name, people, location, desc)
{
  var event = {time: time, name: name, people: people, location: location, description: desc};
}

var bringTuesday = function Tuesday(){
  return Tuesday;
}
var bringWednesday = function Wednesday(){
  return Wednesday;
}
var bringThursday = function Thursday() {
  return Thursday;
}
var bringFriday = function Friday() {
  return Friday;
}
var bringSaturday = function Saturday() {
  return Saturday;
}
var bringSunday = function Sunday() {
  return Sunday;
}
// var week = ["Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var week = [bringMonday(), bringTuesday(), bringWednesday(), bringThursday(), bringFriday(), bringSaturday(), bringSunday()];


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropDownValue: 'Pick a day',
      pickedDay: Monday,
    }
    this.acceptEvent = this.acceptEvent.bind(this);
  }
  componentDidMount(){

    //do API call. With the coming JSON check if its in the same format as above
    //If like above, push into array and check if its there.
    Sunday.push(eventA[0]);
  }
  changeValue(text) {
    if (this.state.dropDownValue === 'Monday' || this.state.dropDownValue === 'Pick a day') {
      this.setState({ pickedDay: Monday });
    }
    else if (this.state.dropDownValue === 'Tuesday') {
      this.setState({ pickedDay: Tuesday });
    }
    else if (this.state.dropDownValue === 'Wednesday') {
      this.setState({ pickedDay: Wednesday });
    }
    else if (this.state.dropDownValue === 'Thursday') {
      this.setState({ pickedDay: Thursday });
    }
    else if (this.state.dropDownValue === 'Friday') {
      this.setState({ pickedDay: Friday });
    }
    else if (this.state.dropDownValue === 'Saturday') {
      this.setState({ pickedDay: Saturday });
    }
    else if (this.state.dropDownValue === 'Sunday') {
      this.setState({ pickedDay: Sunday });
    }
    this.setState({dropDownValue: text})
  }
  acceptEvent(){
    if(this.state.bgColor === 'lightgray'){
      this.setState({
        bgColor: '#007BFF',
      });
    }
    else{
      this.setState({
        bgColor: 'lightgray',
      });
    }
  }
  render()
  {
      return (
      <div className="App">
        <div className = 'borders-out'>
          <div className = "top-section">
            <div style ={{display: 'inline-flex', width: '100%'}}>
              <h1 style={{width: 150,}}>MeetMe</h1>
              <div>
                {/* <p className="title">Conflicts</p> */}
                <div className = "profile-picture"></div>
              </div>
            </div>
          </div>
          <div className ='days'>
            <DropdownButton title={this.state.dropDownValue}>
              {week.map((day) => {
                return <Dropdown.Item as="button" key={day}><div onClick={(e) => this.changeValue(e.target.textContent)}>{(day.name)}</div></Dropdown.Item>;
              })}
            </DropdownButton>
          </div>
              <ListGroup>
              {this.state.pickedDay.map((e) => {
                return <ListGroup.Item>
                  <div className = "event-border">
                    <ul style={{listStyleType: "none",}}> 
                      <li>{e.name}</li>
                      <li>{e.time}</li>
                      <li>{e.location}</li>
                      <li>{e.people.map((person) =>{return `${person}, `})}</li>
                      <li>{e.description}</li>
                    </ul>
                    <Button className ="" onClick={this.acceptEvent} style={{ marginLeft: '2.8%', backgroundColor: this.state.bgColor }}>+</Button>
                  </div>
                  </ListGroup.Item>;
              })}
              </ListGroup>
        </div>
      </div>
    );
  }
}

export default App;
