import React, { useState } from 'react'
import Axios from "axios"

const SearcherTicker = (props) => {
    const [tickerSymbol, setTickerSymbol] = useState('')
    const [invalidtickerSymbol, setinvalidTickerSymbol] = useState('')

    const tickerAPI = () => {
        Axios.post('http://localhost:3001/api/ticker', {
            tickerSymbol: tickerSymbol
            // invalidtickerSymbol: invalidtickerSymbol
        }).then(() => {
            alert('sent')
        })
    }

    const errorticker = (e) => {
        if (document.getElementById('tickerSymbol').value == 'appl') {
            e.preventDefault()
            setinvalidTickerSymbol('Invalid Ticker')
        }
    }



    return (
        <div>

            <h3 id="search-title">Get Predictions From Our Powerful ML Algorithm</h3>
            {/* <form action="" onSubmit={e => e.preventDefault()}> */}
            <form onSubmit={errorticker} action="dashboard" id="customForm">
                {invalidtickerSymbol ? [invalidtickerSymbol].map(e =>

                    <p className="error-msg">{e}</p>
                    // <p>hello world</p>

                ) : <div></div>}
                <input type="text" onChange={(e) => {
                    setTickerSymbol(e.target.value)
                }} id="tickerSymbol" size="35" placeholder="Search for news, tickers, or companies" required />
                <p>

                    <button id="submit" onClick={tickerAPI}>Search</button>
                </p>

            </form>

        </div>
    )
}

export default SearcherTicker
