import { useState } from 'react';
import './App.css';

function App() {
  const [activeSectionNumber, setActiveSectionNumber] = useState(0);
  return (
    <div className='App'>
      <main className='main'>
        <div className='header'>
          <h2>
            Discover an insight <span>🚀</span>{' '}
          </h2>
        </div>
        <div className='sections_wrap'>
          <h3>SECTIONS</h3>
          <div className='button_container'>
            <button
              className={
                'section_btn' +
                (activeSectionNumber === 1 ? ' activeSectionButton' : '')
              }
              onClick={() => setActiveSectionNumber(1)}
            >
              Customers
            </button>
            <button
              className={
                'section_btn' +
                (activeSectionNumber === 2 ? ' activeSectionButton' : '')
              }
              onClick={() => setActiveSectionNumber(2)}
            >
              Rewards
            </button>
            <button
              className={
                'section_btn' +
                (activeSectionNumber === 3 ? ' activeSectionButton' : '')
              }
              onClick={() => setActiveSectionNumber(3)}
            >
              Activities
            </button>
          </div>
        </div>
        <div className='blocks_wrap'>
          <h3>FUNCTIONS</h3>
          <button className='block_btn'>
            How many users who does login daily?
          </button>
          <button className='block_btn'>
            Total number of users who levelled down the membership ?
          </button>
          <button className='block_btn'>
            How many users are setted the Gold membership ?
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
