import { useState } from "react";
import Image from 'next/image'

import image1 from '../assets/images/image-1.png'
import image2 from '../assets/images/image-2.png'
import image3 from '../assets/images/image-3.png'


function Home() {
    const [image, setImage] = useState();
    const [currentImageId, setCurrentImageId] = useState();
    const [text, setText] = useState();
    const [caption, setCaption] = useState();

    function handleClick() {
        if (!image) {
            setText()
            setCaption('06/05/2023: Onde é que esperrow? (Jack Sparrow)')
            setImage(image1)
            setCurrentImageId(1)
        } else if (currentImageId === 1) {
            setText()
            setCaption('23/12/2022: Jurassic Uorrdí')
            setImage(image2)
            setCurrentImageId(2)
        } else if (currentImageId === 2) {
            setText()
            setCaption('15/04/2023: Mario verde')
            setImage(image3)
            setCurrentImageId(0)
        } else if (currentImageId == 0) {
            setImage()
            setCaption()
            setText('Amo muito você! <3')
            setCurrentImageId(1)
        } else if (currentImageId == 1) {
            setText()
            setCaption('Mario verde')
            setImage()
            setCurrentImageId(1)
        }
    }

    return (
        <>
            <div className="container">
                <div className="header">
                    <input type="button" value="Clique aqui" onClick={ handleClick }></input>
                    <h1>Para o top 3 cosplays da história</h1>
                </div>

                <p className="text">{ caption }</p>
                <div className="imageContainer">
                    <Image className="image" src={ image } />
                    <h1 className="text">{ text }</h1>
                </div>
            </div>
        </>
    )
}

export default Home
