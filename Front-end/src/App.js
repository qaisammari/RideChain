import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import token from './token';
class App extends Component {
state = {
    owner: '',
    rider: '',
    driver: '',
    rideCost: '',
    escrowBalance: 0,
    multiplier: 1000000000000000000
};
 async componentDidMount()  {
    const owner =  await token.methods.getOwner().call();
    const rider =  await token.methods.getRider().call();
    const driver =  await token.methods.getDriver().call();
    const rideCost =  await token.methods.getRideCost().call();
    const escrowBalance =  await token.methods.getEscrowBalance().call();
    // rideCost = rideCost/100;
    this.setState({ owner });
    this.setState({ rider });
    this.setState({ driver });
    this.setState({ rideCost });
    this.setState({ escrowBalance: escrowBalance });
  }

  orderRide = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Your Ride is being Ordered...' });
    await token.methods.orderRide().send({
      from: accounts[0],
      value: this.state.rideCost
    });
    this.setState({ message: 'Waiting for a driver to accept!' });
    var escrowBalance = await token.methods.getEscrowBalance().call();
    this.setState({ escrowBalance: escrowBalance });

  };

acceptRide = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'The driver is accepting the order ..' });
    await token.methods.accept().send({
        from: accounts[0],
    });
    var escrowBalance = await token.methods.getEscrowBalance().call();
    this.setState({ escrowBalance: escrowBalance });
    this.setState({ message: 'The driver on his way!' });
};

finishRide = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Finishing the ride ...' });
    await token.methods.accept().send({
        from: accounts[0],
    });

    const escrowBalance = await token.methods.getEscrowBalance().call();
    this.setState({ escrowBalance: escrowBalance });

    this.setState({ message: 'We hope you enjoyed your trip with RideChain , dont forget to rate us !' });
};


  getBalance = async event => { 
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    console.log(typeof accounts[0],  accounts[0]);
    this.setState({ message: 'Waiting on transaction success...' });
    let result = await token.methods.balances(this.state.address).call({
      from: accounts[0]
    });
console.log(result)
    this.setState({ message: result });
  };
  transfer = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
     await token.methods.transfer(this.state.address,this.state.value).send({
      from: accounts[0]
    });

    this.setState({ message: "transaction has been entered" });
  };
  transferFrom = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
     await token.methods.transferFrom(this.state.addressFrom, this.state.address,this.state.value).send({
      from: accounts[0]
    });

    this.setState({ message: "transaction has been entered" });
  };
  approve = async event => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
     await token.methods.approve(this.state.address,this.state.value).send({
      from: accounts[0]
    });

    this.setState({ message: "transaction has been entered" });
  };
  getEthers= async event => {
   event.preventDefault();
   const accounts = await web3.eth.getAccounts();
   this.setState({ message: 'Waiting on transaction success...' });
   await token.methods.getEthers(this.state.value).send({
     from: accounts[0]
   });
   this.setState({ message: 'You sold your tokens!' });
  };

  divStyle = {
        padding: '1rem',
    };

  messageColor = {
      color: '#ff0000'
  }

  render() {
    return (
      <div style={this.divStyle}>
          <img src={require('./logo.jpg')} />

          <h2>Ride Chain !</h2>
        <p>
          Ride chain is owned by {this.state.owner}
        </p>

          <h2>Ride Information</h2>
          <p>
              Rider: Qais ( {this.state.rider} )
          </p>

          <p>
              Driver: Tareq ( {this.state.driver} )
          </p>

          <p>
              Ride Cost: {this.state.rideCost/this.state.multiplier} ETH , {(this.state.rideCost/this.state.multiplier)*297} USD
          </p>

          <p style={this.messageColor}>
              Escrow Balance: {this.state.escrowBalance/this.state.multiplier} ETH , {(this.state.escrowBalance/this.state.multiplier)*297} USD
          </p>

          <p>
              Ride Route: Location 1 to Location 2 (50 KM)
          </p>
        <hr />

          <h2>Ride in action</h2>
          <form onSubmit={this.orderRide}>
              <p>
                  Rider: Order Ride <button>CONFIRM</button>
              </p>
          </form>
          <form onSubmit={this.acceptRide}>
              <p>
                  Driver: Accept Ride <button>Accept</button>
              </p>
          </form>
          <form onSubmit={this.finishRide}>
              <p>
                  Rider: Approve the drop <button>Finish Ride</button>
              </p>
          </form>

          <hr />

          <h1 style={this.messageColor}>{this.state.message}</h1>

          <img src={require('./giphy.gif')} />


      </div>
    );
  }
}
export default App
