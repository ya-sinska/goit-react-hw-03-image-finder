import { Component } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import {ImageGallery} from "../ImageGallery/ImageGallery"
import { Container } from "./App.styled";
// import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
  imageName:'',
  }
  searchImage = (imageName) => {
    this.setState({imageName});
  }
  render() {
    const {imageName } = this.state;
    return (
    <Container>
        <Searchbar onSubmit={this.searchImage} /> 
        <ImageGallery imageName={imageName} />
        {/* <ToastContainer /> */}
      </Container>
      
    
  );
}};
