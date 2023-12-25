import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';


const StatisticsTab = () => {
  const data = [];

  for (let index = 0; index < 12; index++) {
    const element = {name: `Page ${index + 1}`, uv: Math.random(Math.exp((Math.sin()))) + 1}
    data.push(element);   
  }



  return (
    <div className='flex flex-col'>
      <div className='relative right-6'>
          <ResponsiveContainer width="100%" height={400} >
            <LineChart data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            </LineChart>
        </ResponsiveContainer>
      </div>
      <div className='flex justify-center items-center text-center'>
      <p>Some Example Chart Here Nothing interesting</p>
      </div>
    </div>
  );
}

export default StatisticsTab
