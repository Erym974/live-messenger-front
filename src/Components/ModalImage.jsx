import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { closeImages as closeSliceImages } from './../Slices/imagesSlices'

export const ModalImage = () => {

    const [activeImage, setImages] = useState(0)

    const { images, downloadable } = useSelector(state => state.images)
    const dispatch = useDispatch()

    const nextImage = () => {
        if(images.length > activeImage + 1) return setImages(activeImage + 1)
        else return setImages(0)
    }

    const previousImage = () => {
        if(activeImage === 0) return setImages(images.length - 1)
        else return setImages(activeImage - 1)
    }

    const closeImages = () => {
        dispatch(closeSliceImages())
    }

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = images[activeImage];
        link.setAttribute('download', images[activeImage]);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

  return (
    <div className="modal-images">
        <div className="background-overlay" onClick={closeImages}></div>
        <div className="content">
        <FaTimes className="close" onClick={closeImages} />
        {images?.length > 1 &&
        <div className="buttons">
            <GrFormPrevious onClick={nextImage} />
            <GrFormNext onClick={previousImage} />
        </div>
        }
        <img src={images[activeImage]} alt="" />
        <div className="bottoms">
            {downloadable && <button onClick={downloadImage}>Download image</button>}
        </div>
        </div>
    </div>
  )
}
