import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css'; // Import CSS for the date-time picker
import './App.css'; // Keep the existing CSS imports
import Carousel from './Components/Carousel';
import Datetime from 'react-datetime'; // Import the date-time picker component

const CourierRegistration = () => {
  const textFieldStyle = {
    padding: '5px',
    margin: '15px 0',
    display: 'flex', // Flex to center content
    flexDirection: 'row', // Elements are in a row
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Align items vertically
    borderRadius: '10px', // Rounded corners for text fields
    border: '1px solid #ccc', // Border style
    width: '80%', // Wider fields for better centering
  };

  const reducedBorderFieldStyle = {
    ...textFieldStyle,
    border: '0.5px solid #ccc', // Reduced border width
  };

  // Updated gap style to have smaller padding
  const gapStyle = {
    padding: '0 5px', // Reduced gap to 5px
  };

  const buttonStyle = {
    padding: '5px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
  };

  const updateButtonStyle = {
    ...buttonStyle,
    background: 'blue', // Blue color for update button
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: '#FF0000', // Red color for delete button
  };

  const submitButtonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '20px', // Rounded corners
    background: 'green', // Green color for Submit button
    color: 'white',
    cursor: 'pointer', // Cursor style
  };

  const searchButtonStyle = {
    padding: '10px',
    borderRadius: '20px', // Rounded corners
    background: '#ff1493', // Pink color for Search button
    color: 'white',
    cursor: 'pointer',
  };

  const [deliveryDate, setDeliveryDate] = useState(null);

  return (
    <>
      <Carousel style={{ marginBottom: '80px' }} />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* ID Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="BookID" style={{ flex: 1 }} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* UserId Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="UserId" style={{ flex: 1 }} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* Contact Number Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="Enter Contact Number" style={{ flex: 1 }} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* Note Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="Note" style={{ flex: 1 }} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* Shipping Address Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="Enter Shipping Address" style={{ flex: 1 }} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* Delivery Date Text Field */}
          <div style={{ ...reducedBorderFieldStyle, flexDirection: 'row' }}>
            <Datetime
              value={deliveryDate}
              onChange={setDeliveryDate}
              inputProps={{ placeholder: 'Select Delivery Date' }}
            />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* Submit and Search buttons */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button style={submitButtonStyle}>Submit</button>
            <span style={gapStyle}></span>
            <button style={searchButtonStyle}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const appStyle = {
    backgroundColor: 'black', // Background color
    height: '150vh', // Full viewport height
    padding: '20px', // Padding for content
    textAlign: 'center', // Align text to center
  };

  return (
    <div className="App" style={appStyle}>
      <CourierRegistration /> {/* Include the CourierRegistration component */}
    </div>
  );
}

export default App;
