pragma solidity ^0.4.24;

contract MyContract {
    string value;

    function get() public returns (string) {
        return value;
    }

    function set(string newValue) public {
        value = newValue;
    }
}
