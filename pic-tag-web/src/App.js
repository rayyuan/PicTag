import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Recognition from './components/Recognition/Recognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
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
    }
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  onSubmit=()=>{
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      console.log('resp');
    },
    function(err) {
      // there was an error
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
        <Recognition/>
      </div>
    );
  }
}


export default App;
