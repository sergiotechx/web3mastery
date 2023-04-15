# web3mastery
trabajo final web3 mastery
**Botón de donación**

El programa al momento realizar el pago, consulta en coinmarket cap el equivalente de 1 dolar al dueño del contrato y le hace el respectivo envio en la cantidad
de BNB correspondiente.
El contrato es ownable por si se quiere cambiar de titular.

**Nota:**
Se eligió de inspiración el video de la quinta semana, ya que es uno de los más relevantes al mostrar la integración contrato inteligente desplegado en la blockchain 
de pruebas de binance y una aplicación web.

**Link de interacción con el contrato:**

[https://thirdweb.com/binance-testnet/0x797EE01EC467F22333d1DB9b3D19D2dFD2a83eC2](https://thirdweb.com/binance-testnet/0x797EE01EC467F22333d1DB9b3D19D2dFD2a83eC2)

Contrato : Forwarder.sol
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

**Instalación:**

* Ejecutar el comando
git clone https://github.com/sergiotechx/web3mastery

* Cambiar al directorio web y ejecutar: npm install

**OBSERVACIONES**
En el raiz del directorio web crear el siguiente archivo:

**.env.local** con  lo siguiente:

NEXT_PUBLIC_CMC_KEY="Su api key del CMC"

Como se ejecuta localkente va a salir un error de CORS al ejecutar el llamado al api, para solucionar esto se sugiere instalar el siguiente plugin;
[](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=es)

**Ejecución:**

Ir a la carpeta, ejecutar: npm run dev

Esto abre un localhost en el puerto 3000

**El contrato está desplegado en la red de pruebas de binance, no ejecutar en la Main Net!** 

![](https://github.com/sergiotechx/web3mastery/blob/main/1coffee.jpg?raw=true)
