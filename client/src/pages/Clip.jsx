import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

function Clip() {
    const [content, setContent] = useState('');
    const [created, setCreated] = useState(false);
    const [lifetime, setLifetime] = useState(600);

    useEffect(() => {
      // take id from URL
      const id = window.location.pathname.split('/')[1];

      // fetch clip data
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/api/${id}`);
        if(!response.ok) {
          setCreated(false);
          return;
        }
        const data = await response.json();
        setContent(data.content);
        console.log(data.content);
        setCreated(true);
        setLifetime(data.lifetime);
      };
      fetchData();

      return () => {
        
      }
    }, [])

    const getTTL = (seconds) => {
      if(seconds == 1) return '1 second';
      if(seconds == 60) return '1 minute';
      if(seconds == 600) return '10 minutes';
      if(seconds == 3600) return '1 hour';
      if(seconds == 86400) return '1 day';
      if(seconds == 604800) return '1 week';
      if(seconds == 2592000) return '30 days';
      return `${seconds} seconds`;
    }

    const handleCreateClip = async () => {
        const id = window.location.pathname.split('/')[1];
      const response = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, lifetime })
      });
      if (!response.ok) {
          console.error('Failed to create clip');
          return;
      }
      setCreated(true);
    };

  const textareaRef = React.useRef(null);

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
  <div className="w-full h-[700px] bg-white rounded-xl shadow-lg p-4 md:p-8 flex flex-col items-center gap-6">
   
        {/* <h1 className="text-3xl font-bold text-purple-700 mb-2">UrClipboard</h1> */}
        {!created && (
          <div className='flex items-center gap-2 w-full justify-start'>
            <button
              onClick={handleCreateClip}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition font-semibold"
            >
              Create Clip
            </button>
            <span className="ml-4">Delete clip after:</span>
            <select
              name="lifetime"
              id="lifetime"
              value={lifetime}
              onChange={(e) => setLifetime(e.target.value)}
              className="ml-2 px-3 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50"
            >
              <option value="1">1 second</option>
              <option value="60">1 minute</option>
              <option value="600">10 minutes</option>
              <option value="3600">1 hour</option>
              <option value="86400">1 day</option>
              <option value="604800">1 week</option>
              <option value="2592000">30 days</option>
            </select>
          </div>
        )}
        {created && (
          <div className="flex w-full justify-start">
            <button
              onClick={handleCopy}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition font-semibold "
            >
              Copy
            </button>
             <div className="flex items-center gap-4 w-full justify-between">
              <span className="text-gray-500 text-sm ml-4">Time to live: {getTTL(lifetime)}</span>
            </div>
          </div>
        )}
          {/* <div className="flex items-center gap-4 w-full justify-between mt-2">
          <span className="text-gray-500 text-sm">Lifetime: {lifetime} second{lifetime !== 1 ? 's' : ''}</span>
        </div> */}
        <textarea
          ref={textareaRef}
          name="clipContent"
          id="clipContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[400px] md:h-[600px] p-4 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg resize-none bg-gray-50 shadow-inner"
          placeholder="Paste or type your text here..."
        ></textarea>
       
      </div>
    </div>
  )
}

export default Clip 