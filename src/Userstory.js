import React,{ useState, useEffect ,Component} from 'react';
import { getToken, getUser, removeUserSession } from './Utils/Common';
import axios from 'axios';
import { render } from 'react-dom';

const user = getUser();
const token = getToken();
class Userstory extends Component {
    async getData() {
        const res = await axios.get('https://api.bybits.co.uk/policys/details', {headers:{'content-type': 'application/json','Authorization':'Bearer '+token,'environment':'mock'} });
        return await res.data; // (Or whatever)
          }
    constructor(props) {
        super(props);
        this.state = {
          userData: null};
      }
    
      componentDidMount() {
        if (!this.state.userData) {
            this.getData().then(userData => this.setState({userData}))
                          .catch(err => { /*...handle the error...*/});
        }
    }

/* onLoad =  axios.get('https://api.bybits.co.uk/policys/details', {headers:{'content-type': 'application/json','Authorization':'Bearer '+token,'environment':'mock'} }).then((response) => {
            console.log(user);
        // this will re render the view with new data
        this.setState({userData:  response.data});
      //  console.log(this.state.userData);
    }).catch(error => {
        console.log('Payment error: ', JSON.parse(error));
        alert('There was an issue with your payment. Please try again!');
      });*/

  render() {
   // const {userData} = this.state
       const userdatav = this.state.userData;
       if(userdatav !== null && userdatav.data !== null)
    console.log(userdatav);
    if(userdatav !== null && userdatav.data !== null){
        
    return (
      <div>
          <h1>My Story</h1>
          <hr/>
        <h4>Policy Reference</h4>
        <p>{(userdatav.policy.policy_reference)}</p>
        <h4>Cover Type</h4>
        <p>{userdatav.policy.cover}</p>
        <h4>Car</h4>
        <p>{userdatav.vehicle.make} {userdatav.vehicle.model} {userdatav.vehicle.colour} {userdatav.vehicle.engine}cc - {userdatav.vehicle.reg}</p>
        <h4>Address</h4>
        <p>{userdatav.policy.address.line_1} <br/>{userdatav.policy.address.line_2}<br/>{userdatav.policy.address.line_3} 
        <br/>{userdatav.policy.address.city},{userdatav.policy.address.county} {userdatav.policy.address.postcode}, {userdatav.policy.address.country} </p>
                      
       </div>
    )
    }
else
return (
    <div>
        <h1>My Story</h1>
        <hr/>
      <h4>Loading Contents..</h4>
        
     </div>
  )

}
}
export default Userstory;