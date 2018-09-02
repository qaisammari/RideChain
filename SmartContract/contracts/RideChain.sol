pragma solidity ^0.4.21;

contract RideChain {
    uint256 escrowBalance;
    address public rider;
    address public driver;
    address private escrow;
    bool riderOK;
    bool driverOK;
    uint256 rideCost;


    constructor(address _rider, address _driver, uint256 _rideCost) public {
        rider = _rider;
        driver = _driver;
        escrow = msg.sender;
        rideCost = _rideCost;
        riderOK = false;
        driverOK = false;
    }

    function accept() public {
        if (msg.sender == rider){
            riderOK = true;
        } else if (msg.sender == driver){
            driverOK = true;
        }
        if (riderOK && driverOK){
            payBalance();
        }
    }

    function payBalance() private {
        if (driver.send(escrowBalance)) {
            escrowBalance = 0;
        } else {
            revert();
        }
    }

    function orderRide() public payable {
        if (msg.sender == rider
        && (msg.value >= rideCost)) {
            escrowBalance += msg.value;
        } else {
            revert();
        }
    }

    function cancel() public {
        if (msg.sender == rider){
            riderOK = false;
        } else if (msg.sender == driver){
            driverOK = false;
        }
        if (!riderOK && !driverOK){
            selfdestruct(rider);
        }
    }

    function kill() public constant {
        if (msg.sender == escrow) {
            selfdestruct(rider);
        }
    }

    function getRideCost() view public returns(uint256) {
        return rideCost;
    }

    function getRider() view public returns(address) {
        return rider;
    }

    function getDriver() view public returns(address) {
        return driver;
    }

    function getOwner() view public returns(address) {
        return escrow;
    }

    function getEscrowBalance() view public returns(uint256) {
        return escrowBalance;
    }
}