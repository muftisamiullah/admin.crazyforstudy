import React,{useEffect,useState} from 'react'
import axios from 'axios'

function BookImage({isbn, width}) {
    const [image, setImage] = useState('');
    
    useEffect(() => {
        async function fetchCoverImage(){
            try{
                const response = await axios.get(`https://crazyforstudy.s3.ap-south-1.amazonaws.com/isbn/${isbn}-us-300.jpg`,{
                // const response = await axios.get(`https://pictures.abebooks.com/isbn/${isbn}-us-300.jpg`,{
                    header: {
                        "Cotnent-Type": 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        "origin": "https://crazyforstudy.s3.ap-south-1.amazonaws.com/"
                        // "origin": "https://pictures.abebooks.com/"
                     }
                });
                if(response.status === 200){
                  setImage(`https://crazyforstudy.s3.ap-south-1.amazonaws.com/isbn/${isbn}-us-300.jpg`);
                //   setImage(`https://pictures.abebooks.com/isbn/${isbn}-us-300.jpg`);
                }
            }catch(err) {
                //setImage(`https://backup.crazyforstudy.com/uploads/book-images-with-text/IMG-${isbn}.jpg`);
                setImage(`https://crazyforstudy.s3.ap-south-1.amazonaws.com/book-images-with-text/IMG-${isbn}.jpg`);
            }
        }
       fetchCoverImage();
    },[isbn])
    return (
        <>
        {image && (<img src={image} style={{ width: width}}/>)}
        {!image && (
        <div className="book_image_container">
            <img src={image} style={{ width: width}}/>
        </div>
        )}
        </>
    )
}

export default BookImage
