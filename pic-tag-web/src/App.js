import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Recognition from './components/Recognition/Recognition';
import Rank from './components/Rank/Rank';
import './App.css';
import Clarifai from 'clarifai';

const app=new Clarifai.App({
  apiKey:'b817023b2ce544e883b431fb61e4fb04'
});


class App extends Component {
  constructor(){
    super()
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }



  onSubmit=()=>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      console.log(this.displayFaceBox(this.calculateFaceLocation(response)));
    },
    function(err) {
      console.log(err);
    }
  );
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <Recognition imageUrl={this.state.imageUrl}/>

      </div>
    );
  }
}


export default App;
