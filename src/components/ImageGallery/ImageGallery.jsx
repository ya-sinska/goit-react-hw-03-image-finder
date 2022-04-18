import { Component } from "react";
import PropTypes from 'prop-types';
import { Gallery, Container } from "./ImageGallery.styled";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import {StartSearch} from "../StartSearch/StartSearch"
import { Loader } from "../Loader/Loader"
import {Modal} from "../Modal/Modal"

export class ImageGallery extends Component {
    state = {
        modalOpen: false,
        modalImage:''
    };
    openModal = (data) => {
        this.setState(prevState => ({
            modalOpen: !prevState.modalOpen,
            modalImage: data}))
    }
    render() {
        const {  modalOpen, modalImage } = this.state;
        const { photos, error, status } = this.props;
    if (status === 'idle') {
        return <StartSearch text="Let's make a choise" />;
    }

    if (status === 'pending') {
      return <Loader/>;
    }

    if (status === 'resolved') {
        return (
            <Container>
                <Gallery>
                    {photos.map(photo =>
                        <ImageGalleryItem key={photo.id}
                            photo={photo} onImageClick={this.openModal} />
                    )}
                </Gallery>
                <Modal isModalOpen={modalOpen} onClose={this.openModal} image={ modalImage}/>
            </Container>)

    } 
    if (status === 'rejected') {
        return <>
            <StartSearch text={error? (error.massege):("Sorry, try again")} />;       
        </>  
    }     
}}

ImageGallery.propTypes = {
    photos: PropTypes.array,
    error: PropTypes.string,
    status: PropTypes.string
    
}