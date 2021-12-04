import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Image from "./graph.jpg"
const Dashboard = (props) => {
    const [pythonContent, setPythonContent] = useState('')
    const [MLprice1, setMLprice1] = useState('')


    useEffect(() => {
        Axios.post('http://localhost:3001/api/ML').then(async (response) => {
            // console.log([response.data['4'], response.data['5'], response.data['6'], response.data['7'], response.data['8'], response.data['9'], response.data['10'], response.data['11'], response.data['12'], response.data['13'], response.data['14'], response.data['15'], response.data['16'], response.data['17'], response.data['18']])
            console.log(response)
            setMLprice1(response.data)

        })
    }, [])




    useEffect(() => {
        Axios.get('http://localhost:3001/api/dashboard').then((response) => {
            setPythonContent(response.data)
        })
    });


    return (
        <div>
            <table className="dashboard-table" >
                <tr>
                    <td>
                        <div className="dashboard">
                            {pythonContent ? [pythonContent].map(e =>

                                <h2>{JSON.stringify(e).replace(/['"]+/g, '').toUpperCase()}</h2>
                                // <p>hello world</p>

                            ) : <div></div>}
                        </div>
                    </td>
                    <td>
                        <div className="dashboard">
                            <h2>Graph</h2>

                        </div>


                    </td>
                </tr>
                <tr>
                    <td>
                        <p>

                            <div id="articles">
                                <h3>Latest Articles</h3>
                                <p>
                                    <p id="headings">Ticker Date Time neg neu pos compound</p>
                                    {MLprice1 ? [MLprice1].map(e =>

                                        <p id="article-style">
                                            {JSON.stringify(e).replace(/[\[\]']+/g, '').replace(/['"]+/g, '').replaceAll('\\r\\n', '').slice(301).replace('compoundTicker', `compound Ticker`).replaceAll('0.0000lcid', `0.0000 lcid`).replace('Mean Sentiment of articles', '')}

                                        </p>
                                        /* <p id="article-test">
                                            {JSON.stringify(e).replace(/[\[\]']+/g, '').replace(/['"]+/g, '').replaceAll('\\r\\n', '').slice(301).replace('compoundTicker', `compound Ticker`).replaceAll('0.0000lcid', `0.0000 lcid`).replace('Mean', ' Mean'), "Test 123123"}
                                        </p> */

                                        // <p>hello world</p>
                                        // <p id="article-test">{JSON.stringify(e).replace(/[\[\]']+/g, '').replace(/['"]+/g, '').replaceAll('\\r\\n', '').slice(301).replace('compoundTicker', `compound Ticker`).replaceAll('0.0000lcid', `0.0000 lcid`).replace('Mean', ' Mean')}</p>


                                    ) : <div></div>}
                                </p>
                            </div>
                        </p>
                    </td>
                    <td>
                        <p>

                            <div id="graph">
                                <h3>Stock Graph</h3>
                                <div id="graphImg"><img id="graphpic" src={Image} /></div>
                            </div>
                        </p>
                    </td>
                </tr>

            </table>
            <div className="price-update">
                <h2>Prices in next 15 days are: </h2>
                {MLprice1 ? [MLprice1].map(e =>

                    <p id="futureprices">{JSON.stringify(e).replace(/[\[\]']+/g, '').replace(/['"]+/g, '').replaceAll('\\r\\n', '').slice(0, 178)}</p>
                    // <p>hello world</p>

                ) : <div></div>}





            </div>


        </div>
    )
}

export default Dashboard
