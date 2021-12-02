import React, { useState, useEffect } from 'react'
import Axios from 'axios'
const Dashboard = (props) => {
    const [pythonContent, setPythonContent] = useState('')
    const [MLprice1, setMLprice1] = useState('')


    const ML_API = () => {
        Axios.post('http://localhost:3001/api/ML').then((response) => {
            // console.log([response.data['4'], response.data['5'], response.data['6'], response.data['7'], response.data['8'], response.data['9'], response.data['10'], response.data['11'], response.data['12'], response.data['13'], response.data['14'], response.data['15'], response.data['16'], response.data['17'], response.data['18']])
            console.log(response)
            setMLprice1(response.data)

        })

    }

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
                            <button onClick={ML_API}>Click to Generate Graph</button>

                        </div>


                    </td>
                </tr>
                <tr>
                    <td>
                        <p>

                            <div id="articles">
                                <h3>Latest Articles</h3>
                                <p>
                                    {MLprice1 ? [MLprice1].map(e =>

                                        <p>{JSON.stringify(e).replace(/[\[\]']+/g, '').replace(/['"]+/g, '').replaceAll('\\r\\n', '').slice(164)}</p>
                                        // <p>hello world</p>

                                    ) : <div></div>}
                                </p>
                            </div>
                        </p>
                    </td>
                    <td>
                        <p>

                            <div id="graph">
                                <h3 hidden>Latest Articles</h3>
                            </div>
                        </p>
                    </td>
                </tr>

            </table>
            <div className="price-update">
                <button onClick={ML_API}>Click for prices in next 15 days</button>
                {MLprice1 ? [MLprice1].map(e =>

                    <p>{JSON.stringify(e).replace(/[\[\]']+/g, '').replace(/['"]+/g, '').replaceAll('\\r\\n', '').slice(0, 161)}</p>
                    // <p>hello world</p>

                ) : <div></div>}





            </div>


        </div>
    )
}

export default Dashboard
