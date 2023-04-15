# web3mastery
trabajo final web3 mastery
**Botón de donación**

El programa al momento realizar el pago, consulta en coinmarket cap el equivalente de 1 dolar al dueño del contrato y le hace el respectivo envio en la cantidad
de BNB correspondiente.
El contrato es ownable por si se quiere cambiar de titular.

**Link de interacción con el contrato:**

[https://thirdweb.com/binance-testnet/0x797EE01EC467F22333d1DB9b3D19D2dFD2a83eC2](https://thirdweb.com/binance-testnet/0x797EE01EC467F22333d1DB9b3D19D2dFD2a83eC2)

Contrato : fordware.sol
``` solidity 
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

//Función de tranferencia al dueño del contrato los wei equivalentes a 1 dolar
contract Forwarder is Ownable {

   event NewCoffee(uint256 timestamp ,address indexed from, string donatorName, string message,uint8 rating );
   uint8 ratingIndex = 0;
   uint256 coffeeQTY = 0;
   struct Coffee{
         uint256 timestamp;
         address sender;
         string name;
         string message;
         uint8 rating;
    }
   
    Coffee[5] coffeeLog;
   
    function getCoffeeLog() public  view returns(Coffee[5] memory){
        return coffeeLog;
    }
    
    function getCoffeeQTY() public  view returns(uint256 ){
        return coffeeQTY;
    }
    
    function donateCoffee(string memory _name, string memory _message, uint8 _rating ) public payable {
        require(msg.value >0 , "Please send the quantity of a cofffee or a little more :) " );
               if(ratingIndex>4){
                ratingIndex = 0;
               }
               coffeeLog[ratingIndex]=(Coffee(block.timestamp, msg.sender, _name,_message,_rating ));
               address payable owner = payable(owner());
               (bool success,) = owner.call{value:msg.value}("");
               require(success == true, "Donation unsucessfull :( )" );
                       coffeeQTY = coffeeQTY +1;
                       emit NewCoffee(block.timestamp,msg.sender,_name,_message,_rating);
                       ratingIndex = ratingIndex +1;
    }
}
```
**Programas o herramientas auxiliares:**
* Hardhat
* Thirdwweb SDK
* NextJS 13
* Tailwindcss
