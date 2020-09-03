import React, { useState ,useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { fadeIn } from 'react-animations'
import styled, { keyframes } from 'styled-components';



const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`} `;
const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function App(props) {

  const [clickState, setClickState] = useState(
    {
      count: 0,
      quote: '',
      quoteAuthor: '',
    }
  );
  useEffect(() => {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
     .then(resp => resp.json())
     .then(data =>  setClickState({
      quote:data.en,
      quoteAuthor:'- '.concat(data.author),
      count: 0
    }))
    },[])
  

    
  const changeColorAndText = (event) => {
    const randomColor = Math.floor(Math.random() * colors.length);
    const colorRandom = colors[randomColor]
    document.querySelector('.App').classList.add("slowmo")
    document.documentElement.style.setProperty('--page-color', colorRandom)
    setTimeout(() => document.querySelector('.App').classList.remove("slowmo"), 1000)
    

  async function fetchQuote(){
      try {
          const response = await fetch(`https://programming-quotes-api.herokuapp.com/quotes/random`);
          const quote= await response.json();
          return quote;
      } catch (error) {
          console.error(error);
      }
  }
  async function getQuot(param){
    const quoteobj= await fetchQuote()
    setClickState({
      quote:quoteobj.en,
      quoteAuthor:'- '.concat(quoteobj.author),
      count: clickState.count + 1
    })
    
  }
  
  getQuot()
  
    
   

  }
  return (
    <div className="App">
      <div className="Quotbox"  id="quote-box">

        <div className="inner-box" id="text">
          <FadeIn key={clickState.count}>

            {clickState.quote !== '' ? <FontAwesomeIcon className='fas fa-quote-left' icon={faQuoteLeft} /> : null}

            <p id="new-quote">{clickState.quote}</p>

            {clickState.quote !== '' ? <FontAwesomeIcon className='fas fa-quote-right' icon={faQuoteRight} /> : null}

            <div id="author">{clickState.quoteAuthor}</div>
          </FadeIn>
        </div>

        <div className="inner-box2">
          <div>
            <span><a href={'https://www.facebook.com/sharer/sharer.php?u=github.com/H1rkul2/&quote='+ encodeURIComponent('"' + clickState.quote +'" '+ clickState.quoteAuthor)} target='blank' ><FontAwesomeIcon className='fab fa-facebook' icon={faFacebook} /></a> </span>
            <span><a href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + clickState.quote +'" '+ clickState.quoteAuthor)} target='blank' id="tweet-quote"><FontAwesomeIcon className='fab fa-twitter' icon={faTwitter} /></a></span>
          </div>
        </div>
        <div className="inner-box3"><button onClick={changeColorAndText}>New quote</button> </div>



      </div>
      <div className="creator"><a href='https://github.com/H1rkul2/' target='blank'>by H1rkul2</a></div>



    </div>
  );
}

export default App;
