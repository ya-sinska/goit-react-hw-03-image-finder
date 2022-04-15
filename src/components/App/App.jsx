import { Component } from "react";
import { Searchbar } from "../Searchbar/Searchbar";
import { Container } from "./App.styled";

export class App extends Component {
  state = {
  imageName:'',
  }
    searchImage = (imageName) => {
    this.setState({imageName});
  }
  render() {
    return (
    <Container>
       <Searchbar onSubmit={this.searchImage} /> 
    </Container>
    
  );
}};
