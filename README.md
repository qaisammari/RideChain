# RideChain
RideChain is a ride order application whereby you can order your rides using Blockchain and pay with Ethers for your rides. RideChain will escrow the payment till the ride is completed 

# Smart Contract Properties

    uint256 escrowBalance: the balance that will be on hold till the ride is completed and approved by the rider and driver
    address public rider: the address of the rider in this ride
    address public driver: the address of the driver who is taking this ride
    address private escrow: address of the escrow contract
    bool riderOK:  boolean indicating that the rider confirmed the completion of the ride
    bool driverOK: boolean indicating that the driver accepts the take this ride
    uint256 rideCost: the cost of the drive in finney

# Smart Contract Functions

    function accept(): rider and driver can accept the ride
    function payBalance(): private function to send the payment to the driver once the ride is approved
    function orderRide(): this function for the rider to order the ride
    function cancel() : cancel the ride


# How to use
 Requirements: node.js web3 truffle Infura react
 Deploy the smart contract: go to the SmartContracts directoy and run node deploy.js
 In the Frontend: go to the Fronend directory and run npm start
