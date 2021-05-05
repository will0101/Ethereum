pragma solidity ^0.8.4;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }

    // function getMessage() public view returns (string) {
    //     return message;
    // }
}
