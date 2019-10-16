import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

var Monday = [{
  time: '09:30 - 10:00',
  name: 'Breakfast',
  people: ['Aaron Kaneti', 'Bradley Ramos'],
  location: 'home',
  description: '',
}
  ,];
var bringMonday = function Monday()
 {
   return Monday;
  };
function Event(time, name, people, location, desc)
{
  var event = {time: time, name: name, people: people, location: location, description: desc};
}
// var Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday = [];
var chem = new Event('11:00 - 11:50', "Chem", 'Aaron Kaneti', 'Tech', 'no desc');
var Tuesday = [];
Tuesday.push(chem);
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
    }
  }
  changeValue(text) {
    this.setState({dropDownValue: text})
  }
  render()
  {
      return (
      <div className="App">
        <p>Danyil is very nice.</p>

          <DropdownButton title={this.state.dropDownValue}>
            {week.map((day) => {
              return <Dropdown.Item as="button" key={day} value={day}><div onClick={(e) => this.changeValue(e.target.textContent)}>{(day.name)}</div></Dropdown.Item>;
            })}
          </DropdownButton>
            <ListGroup>
            {Monday.map((e) => {
              return <div><ListGroup.Item>Event Name: {e.name}</ListGroup.Item>
              <ListGroup.Item>Event Time: {e.time}</ListGroup.Item></div>;
            })}
            </ListGroup>
      </div>
    );
  }
}

export default App;
