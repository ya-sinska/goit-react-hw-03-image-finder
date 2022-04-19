import { Component } from "react";
import * as Scroll from 'react-scroll';
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery"
import {LoadMoreBtn} from "../Button/Button"
import { Container } from "./App.styled";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchImages } from '../../services/api'
import { notifi } from "../../services/notifi"
const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export class App extends Component {
  state = {
    imageName: '',
    page: 1,
    photos: [],
    status: Status.IDLE,
    error: null,
    total: 0,

  }
  componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    if (this.state.page !== prevState.page || prevName !== nextName) {
      this.setState({ status: Status.PENDING })
      fetchImages(nextName, this.state.page)
        .then(photos => {
          if (photos.hits.length > 0) {
            this.setState(prevState => ({
              photos: [...prevState.photos, ...photos.hits],
              status: Status.RESOLVED,
              total: photos.total,
            }))
          }
          else {
            this.setState({ status: Status.REJECTED });
            notifi(`Picture ${nextName} didn't find`);
          }
        })
        .catch(error => {
          this.setState({ error: error, status: Status.REJECTED });
          notifi(error.massege);
        });
    }
  }
  LoadMore = () => {
      this.setState(prevState => ({
        page:prevState.page+1
      }))
    Scroll.animateScroll.scrollMore(300);
    }
  searchImage = (imageName) => {
    this.setState({ imageName, page:1, photos: []});
    Scroll.animateScroll.scrollToTop()
  }
  render() {
    const {status, photos, error, total} = this.state;
    return (
      <Container>
        <ToastContainer />
        <Searchbar onSubmit={this.searchImage} /> 
        <ImageGallery photos={photos} status={status} erorr={error}/>
        {photos.length !== total && (<LoadMoreBtn LoadMore={this.LoadMore} />)}
    </Container>
  );
}};
