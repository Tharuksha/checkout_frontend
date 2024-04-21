import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css'; // Import CSS for the date-time picker
import './App.css'; // Keep the existing CSS imports
import Carousel from './Components/Carousel';
import Datetime from 'react-datetime'; // Import the date-time picker component

const CourierRegistration = () => {
  // Inline styles for text fields and buttons with border radius and updated colors
  const textFieldStyle = {
    padding: '5px',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px', // Rounded corners for text fields
    border: '1px solid #ccc', // Border style
  };

  const gapStyle = {
    padding: '0 5px', // Small gap between elements
  };

  const updateButtonStyle = {
    marginLeft: '5px',
    padding: '5px',
    border: 'none', // Remove border
    borderRadius: '5px', // Rounded corners for buttons
    background: 'blue', // Blue color for Update button
    color: 'white', // White text on buttons
    cursor: 'pointer', // Cursor style
  };

  const deleteButtonStyle = {
    marginLeft: '5px',
    padding: '5px',
    border: 'none', // Remove border
    borderRadius: '5px', // Rounded corners for buttons
    background: '#FF0000', // Red color for Delete button
    color: 'white', // White text on buttons
    cursor: 'pointer',
  };

  const submitButtonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '20px', // Rounded corners
    background: 'green', // Green color for Submit button
    color: 'white',
    cursor: 'pointer',
  };

  const searchButtonStyle = {
    padding: '10px',
    border: 'none',
    borderRadius: '20px', // Rounded corners
    background: '	#ff1493', // Pink color for Search button
    color: 'white',
    cursor: 'pointer',
  };

  const [deliveryDate, setDeliveryDate] = useState(null); // State for the date-time picker

  return (
    <>
      <Carousel style={{ marginBottom: '80px' }} />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
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

        {/* Delivery Date Text Field with buttons */}
        <div style={textFieldStyle}>
          <Datetime
            value={deliveryDate}
            onChange={setDeliveryDate}
            inputProps={{ placeholder: 'Select Delivery Date' }} // Custom placeholder
            style={{ flex: 1 }}
          />
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

        {/* Submit and Search buttons aligned to the center */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button style={submitButtonStyle}>Submit</button>
          <span style={gapStyle}></span>
          <button style={searchButtonStyle}>Search</button>
        </div>
      </div>
    </>
  );
};

function App() {
  const appStyle = {
    backgroundColor: 'black', // Background color
    height: '200vh', // Full viewport height
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

