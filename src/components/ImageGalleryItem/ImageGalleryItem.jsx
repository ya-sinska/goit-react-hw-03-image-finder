import {GalleryItem, GalleryImage} from "./ImageGalleryItem.styled"
export const ImageGalleryItem = ({ photo}) => {
    return (
    <GalleryItem>
        <GalleryImage src={photo.webformatURL} alt="" />
    </GalleryItem> 
    )

}