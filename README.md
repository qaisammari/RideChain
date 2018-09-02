# RideChain
RideChain is a ride order application whereby you can order your rides using Blockchain and pay with Ethers for your rides. RideChain will escrow the payment till the ride is completed 

This project will give you a very good understanding on how Escrow smart contracts work !

# Smart Contract Properties

1. the balance that will be on hold till the ride is completed and approved by the rider and driver

        uint256 escrowBalance

2. the address of the rider in this ride

        address public rider

3. the address of the driver who is taking this ride

        address public driver

4. address of the escrow contract

        address private escrow

5. boolean indicating that the rider confirmed the completion of the ride

        bool riderOK

6. boolean indicating that the driver accepts the take this ride

        bool driverOK

7. the cost of the drive in finney

        uint256 rideCost


# Smart Contract Functions

1. functio for the rider and driver can accept the ride

        function accept()
   
2. function to send the payment to the driver once the ride is approved by all parties

        function payBalance()

3. function for the rider to order the ride

        function orderRide()
  
4. function to cancel the ride

        function cancel()


# How to use
     
1. Requirements
     
        node.js web3 truffle Infura react
     
 2. Deploy the smart contract
 
    go to the SmartContracts directoy and run the deployment script
 
        node deploy.js
 
    for the demo UI, go to the Fronend directory and run the server
    
         run npm start
