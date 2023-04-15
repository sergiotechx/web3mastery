import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers, utils } from "ethers";
import { UseForm, useForm  } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import getBNBQTY from "./utils/bnbprice";
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import logo from '../public/web3mastery.png';
import { useState } from "react";
import { ButtonMessages } from "./utils/messages";


const contractAddress = "0x797EE01EC467F22333d1DB9b3D19D2dFD2a83eC2";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [buttonText, setButtonText] = useState(ButtonMessages.initialState);

  const { contract } = useContract(contractAddress);
  const { data: coffeeQTY, isLoading: getCoffeeQTYLoading } = useContractRead(contract, "getCoffeeQTY");
  const { data: coffeeLog, isLoading: getCoffeeLogLoading } = useContractRead(contract, "getCoffeeLog");



  const address = useAddress();
  const { register, handleSubmit,reset } = useForm();

  const donar1Cafe = async (data) => {
    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = true;
    setButtonText(ButtonMessages.sending);
    const bnbqty = await getBNBQTY();
    
    const coffeeValue = utils.parseEther(bnbqty.toString());
    const coffeeParams = [data.nombre, data.mensaje, rating];
    const tx = await contract.call("donateCoffee", coffeeParams, { value: coffeeValue });
    submitButton.disabled = false;
    reset();


    setRating(0);
    
   
    setButtonText(ButtonMessages.initialState);
  }

  return (

    <div >
      <div className="flex px-4 py-2 absolute top-2 right-2">
        <ConnectWallet />
      </div>
      <main >
        <h1 className={styles.title}>
          Welcome to
        </h1>
        <Image className="mx-auto mt-8"
          src={logo}
          alt="Web 3 mastery"
          width={400}
          height={400}
        />
        <p className="text-justify text-xl mt-5 px-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          It has survived not only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>


        <div className="w-1/4  mx-auto mt-10 bg-gray-800 rounded-md ">
          <h1 className="text-center text-2xl ">¿Te gustó el artículo?</h1>
          <p className="text-xl text-center my-1">
            Cafés donados: {parseInt(coffeeQTY, 16)}
          </p>
          <form onSubmit={handleSubmit(donar1Cafe)}>
            <div>
              <label className="ml-2 my-2">Nombre:</label>
              <input className="border border-white w-3/4 ml-8" type="text" {...register('nombre')} />
            </div>
            <div>
              <label className="ml-2">Mensaje:</label>
              <input className="border border-white w-3/4 ml-8" type="text" {...register('mensaje')} />
            </div>
            <div className="flex flex-row">
              <label className="ml-2">Calificación:</label>
              <div className="flex flex-row ml-2">

                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;

                  return <label>
                    <input
                      key={ratingValue}
                      className="hidden"
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => { setRating(ratingValue) }}

                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      onMouseEnter={() => { setHover(ratingValue) }}
                      onMouseLeave={() => { setHover(0) }}
                    />
                  </label>
                })}
              </div>
            </div>
            <div className="flex justify-center">
              <input
                id="submit-button"
                className="bg-gray-400 hover:bg-gray-600 text-black font-bold py-2 px-4 rounded"
                type="submit"
                value={address ? buttonText : "Favor conectar la billetera"}
              />
            </div>
          </form>
        </div>
        <p className="text-2xl text-center my-5">
          Últimas donaciones
        </p>

        <div className="flex justify-center">
          <table className="w-1/2 bg-slate-800">
            <thead className="table-header-group">
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Mensaje</th>
                <th className="border px-4 py-2">Rating</th>
              </tr>
            </thead>
            <tbody>

              {!getCoffeeLogLoading ?
                (

                  coffeeLog.map((item, index) => {
                    if (item.sender != 0x0000000000000000000000000000000000000000) {
                      return (
                        <tr>
                          <th className="border px-4 py-2">{item.name}</th>
                          <th className="border px-4 py-2">{item.message}</th>
                          <th className="border px-4 py-2">{item.rating}</th>
                        </tr>
                      )
                    }

                  })


                )
                : (<></>)
              }


            </tbody>
          </table>
        </div>



      </main>
    </div>
  );
}
