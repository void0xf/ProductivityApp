import React from 'react'

    
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const label = Object.keys(payload[0].payload)[0];
      const labelData = Object.values(payload[0].payload)[0]
      const color = payload[0].stroke
      const label2 = Object.keys(payload[0].payload)[1];
      const labelData2 = Object.values(payload[0].payload)[1]
      return (
        <div className="bg-gray-800 text-white p-4 rounded shadow-md">
          <p className="mb-2"><strong>{label}:</strong> {labelData}</p>
          <p className={`text-[${color}]`}><strong>{label2}:</strong> {labelData2}</p>
        </div>
      );
    }

    return null;
  };


export default CustomTooltip
