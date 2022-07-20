import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { AuthContext } from '../../App';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Quizes() {



    const [quize, setQuize] = useState([])
    const { state: authState } = React.useContext(AuthContext)

    useEffect(() => {

        const url = `http://localhost:4000/admin/quizes`;

        const fetchData = async () => {
            try {
                const response = await fetch(url,
                    {
                        method: "GET",
                        headers: {
                            'authorization': 'Bearer ' + authState.token,
                        },
                    });
                const json = await response.json();
                console.log(json);
                setQuize(json.results);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData()
    }, [])



    return (
        <div style={{width: '80%', height: '400px', margin: '100px', backgroundColor: 'white', textAlign: 'center'}}>
            <h3 style={{color: 'darkgray'}}>Quiz Score</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={200}
                    height={200}
                    data={quize}
                    margin={{
                        top: 50,
                        right: 50,
                        left: 50,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

    )
}

export default Quizes