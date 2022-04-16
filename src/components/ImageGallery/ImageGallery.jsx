import { Component } from "react";
import { fetchImages } from '../../services/api'
import { notifi } from "../../services/notifi"
import { ToastContainer} from 'react-toastify';
import { Gallery } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import {StartSearch} from "../StartSearch/StartSearch"
import { Loader } from "../Loader/Loader"

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class ImageGallery extends Component { 
    state = {
    photos: null,
    error: null,
    status: Status.IDLE,
    };
    componentDidUpdate(prevProps,_) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        if (prevName !== nextName) {
            this.setState({ status: Status.PENDING })
            fetchImages(nextName)
                .then(photos => {
                    if (photos.total !== 0) { this.setState({ photos: photos.hits, status: Status.RESOLVED }) }
                    else {
                        this.setState({ status: Status.REJECTED });
                        notifi (nextName);
                    }
                })
                .catch(error => {
                    this.setState({ error: error, status: Status.REJECTED });
                    notifi (error.massege);
                });
        }
    }
    render() {
    const { photos, error, status } = this.state;
    
    if (status === 'idle') {
        return <StartSearch text="Let's make a choise" />;
    }

    if (status === 'pending') {
      return <Loader/>;
    }

    if (status === 'resolved') {
        return (
            <Gallery>
                {photos.map(photo => <ImageGalleryItem key={photo.id} photo={photo} />)}
                <button>Load more</button>
            </Gallery>)

    } 
    if (status === 'rejected') {
        return <>
            <StartSearch text={error? (error.massege):("Sorry, try again")} />;
            <ToastContainer />
        </>  
    }     
}

}
