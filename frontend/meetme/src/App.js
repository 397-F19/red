import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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

// var week = ["Monday", "Tuesday", 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var week = [bringMonday(), bringTuesday()];


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dropDownValue: 'Pick a day',
      pickedDay: Monday,
      bgColor: 'navyblue',
    }
    this.acceptEvent = this.acceptEvent.bind(this);
  }
  changeValue(text) {
    if (this.state.dropDownValue == 'Monday' || this.state.dropDownValue == 'Pick a day') {
      this.setState({ pickedDay: Monday });
    }
    else if (this.state.dropDownValue == 'Tuesday') {
      this.setState({ pickedDay: Tuesday });
    }
    this.setState({dropDownValue: text})
  }
  acceptEvent(){
    this.setState(prevState => ({
      bgColor: 'lightgray',
    }));
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
                return <Dropdown.Item as="button" key={day} value={day}><div onClick={(e) => this.changeValue(e.target.textContent)}>{(day.name)}</div></Dropdown.Item>;
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
                    <Button onClick={this.acceptEvent} style={{ marginLeft: '2.8%', backgroundColor: this.state.bgColor }}>+</Button>
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
