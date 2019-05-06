import React, { Component } from 'react';
import logo from '../style/pokemon-logo.png';
import '../style/App.css';
import axios from 'axios'
import PostList from "../components/PostList.js"
import SearchBar from "../components/Bar.js"
import Details from "../components/Details.js"

class Pokemon extends Component {
  constructor({match}) {
    super()
    this.state = {
      pokemons: [],
      sprites: [],
      details: null,
      value: '',
      submit: false,
      page:match.params.name
    }
  }

  async asyncFetch (){
    await axios.get (`https://pokeapi.co/api/v2/pokemon/?limit=802`)
      .then(res => {
        let all = res.data
        this.setState({ pokemons:all.results});
      })
      .catch(error => {
          console.log(error.response)
      })
  }

  async fetchDetails (urlPokemon) {
    await axios.get(urlPokemon).then(res => {
      let poke = res.data
      this.setState({details: poke})
    })  
    .catch(error => {
      console.log(error.response)
    })
  }

  async fetchSprites () {
    let spritesTab = []
    console.log("début fetch sprites")
    for (let i=0; i < 802 ; i++){
      await axios.get (this.state.pokemons[i].url).then(res => {
        let sprite = res.data.sprites.front_default
        spritesTab.push(sprite)
        this.setState({sprites: spritesTab})
      })  

      .catch(error => {
          console.log(error.response)
      })
    }
    console.log("fin fetch sprite, size:"+spritesTab.length)
    
  }

  async componentDidMount(){
    await this.asyncFetch()
    if (this.state.page!==undefined)  {
      if (this.state.pokemons.find(p => p.name === this.state.page)){
        let p = this.state.pokemons.find(p => p.name === this.state.page)
        await this.fetchDetails(p.url)
        this.setState({
          submit: true
        })
      }
      else{alert("Not a pokemon")}
    }
    await this.fetchSprites()
  }

  handleChange(ev){
    this.setState({
      value: ev.target.value, submit:false
    })
  }

  async handleSubmit(event){
    event.preventDefault();
    
    if (this.state.pokemons.find(p => p.name === this.state.value)){
      let p = this.state.pokemons.find(p => p.name === this.state.value)
      await this.fetchDetails(p.url)
      this.setState({
        submit: true
      })
    }
    else{alert("Not a pokemon")}
    
  }

  render() {
    const {pokemons, sprites, details, value, submit} = this.state
    const searched = (!pokemons ? [] : pokemons.filter(pokemon => pokemon.name.includes(value)))
    let searchedSprites = []
    for (let i=0; i < searched.length; i++ ){
      var parts= searched[i].url.split('/')
      var lastSegment = parts.pop() || parts.pop() 
      var id = Number(lastSegment) -1
      if (id < sprites.length) (searchedSprites.push(sprites[id]))
    }

    return (
        <div className="App">
          <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <div style={{width: '85%'}}>
              <SearchBar handleChange ={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
              {(!submit ? '' : <Details pokemon={details}/> )}
              {(submit ? '' : <PostList data={searched} sprite={searchedSprites}/>)}
            </div>
          </header>
        </div>
    );
  }
}

export default Pokemon;
