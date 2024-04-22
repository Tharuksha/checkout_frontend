import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import './App.css';
import Carousel from './Components/Carousel';
import Datetime from 'react-datetime';
import axios from 'axios'; // Import Axios for HTTP requests



const CourierRegistration = () => {
  const textFieldStyle = {
    padding: '5px',
    margin: '15px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    border: '1px solid #ccc',
    width: '80%',
  };

  const reducedBorderFieldStyle = {
    ...textFieldStyle,
    border: '0.5px solid #ccc',
  };

  const gapStyle = {
    padding: '0 5px',
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
    background: 'blue',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    background: '#FF0000',
  };

  const submitButtonStyle = {
    padding: '10px',
    borderRadius: '20px',
    background: 'green',
    color: 'white',
    cursor: 'pointer',
  };

  const searchButtonStyle = {
    padding: '10px',
    borderRadius: '20px',
    background: '#ff1493',
    color: 'white',
    cursor: 'pointer',
  };
  
  const [orderid, setorderid] = useState(''); // State for orderid
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [bookId, setBookId] = useState(''); // State for Book ID
  const [userId, setUserId] = useState(''); // State for User ID
  const [contactNumber, setContactNumber] = useState(''); // State for contact number
  const [note, setNote] = useState(''); // State for note
  const [shippingAddress, setShippingAddress] = useState(''); // State for shipping address

  // Event handlers for each action

  const handleDelete = async () => {
    if (orderid) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/${orderid}`);
        alert('Order deleted successfully');
      } catch (error) {
        alert('Error deleting order');
      }
    } else {
      alert('Please provide a valid Book ID to delete.');
    }
  };

  const handleUpdate = async () => {
    if (orderid) { // Validation check for order ID
      try {
        await axios.put(`http://localhost:8080/api/orders/${orderid}`, {
          orderid: orderid,
          book_id: bookId,
          userId: userId,
          contactNumber: contactNumber,
          deliveryDate: deliveryDate ? deliveryDate.format('YYYY-MM-DD') : '',
          shippingAddress: shippingAddress,
          note: note,
        });
        alert('Order updated successfully');
      } catch (error) {
        console.error('Error updating order:', error);
        alert('An error occurred while updating the order. Please try again.');
      }
    } else {
      alert('Please provide a valid Order ID to update.'); // Corrected message
    }
  };
  
  const handleSubmit = async () => {
    try {
        await axios.post('http://localhost:8080/api/orders', {
            orderid:orderid,
            book_id: bookId,
            userId: userId,
            contactNumber: contactNumber,
            deliveryDate: deliveryDate ? deliveryDate.format('YYYY-MM-DD') : '',
            shippingAddress: shippingAddress,
            note: note,
        });
        alert('Order submitted successfully');
    } catch (error) {
        alert('Error submitting order');
    }
};


const handleSearch = async () => {
  if (orderid) {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderid}`);
      if (response.data) {
         // If an order is found, update the corresponding states
         const order = response.data;
        setBookId(order.bookId || '');
        setUserId(order.userId || '');
        setContactNumber(order.contactNumber || '');
        setShippingAddress(order.shippingAddress || '');
        setNote(order.note || '');
        setDeliveryDate(order.deliveryDate ? Datetime.moment(order.deliveryDate) : null);
        alert('Order found');
        // Additional code to handle the found order
      } else {
        alert('Order not found');
      }
    } catch (error) {
      console.error(error);
      alert('Error searching for order');
    }
  } else {
    alert('Please provide a valid Order ID to search.');
  }
};



  return (
    <>
      <Carousel style={{ marginBottom: '80px' }} />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={textFieldStyle}>
    <input
        type="text"
        placeholder="OrderID"
        style={{ flex: 1 }}
        onChange={(e) => setorderid(e.target.value)} // Set 'orderid', not 'userId'
    />
    <span style={gapStyle}></span>
    <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
    <span style={gapStyle}></span>
    <button style={deleteButtonStyle} onClick={handleDelete}>Delete</button>
</div>


          {/* BookID Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="BookID" style={{ flex: 1 }}  value={bookId} onChange={(e) => setBookId(e.target.value)} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle} onClick={handleDelete}>Delete</button>
          </div>

          {/* UserId Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="UserId" style={{ flex: 1 }}  value={userId} onChange={(e) => setUserId(e.target.value)} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle}>Delete</button>
          </div>

          {/* Contact Number Text Field with buttons */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="Enter Contact Number" style={{ flex: 1 }} value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle} onClick={handleDelete}>Delete</button>
          </div>

          {/* Note Text Field */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="Note" style={{ flex: 1 }} value={note}  onChange={(e) => setNote(e.target.value)} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle} onClick={handleDelete}>Delete</button>
          </div>

          {/* Shipping Address Text Field */}
          <div style={textFieldStyle}>
            <input type="text" placeholder="Enter Shipping Address" style={{ flex: 1 }} value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle} onClick={handleDelete}>Delete</button>
          </div>

          {/* Delivery Date Text Field */}
          <div style={{ ...reducedBorderFieldStyle, flexDirection: 'row' }}>
            <Datetime
              value={deliveryDate}
              onChange={setDeliveryDate}
             // State value for Delivery Date
              inputProps={{ placeholder: 'Select Delivery Date' }}
            />
            <span style={gapStyle}></span>
            <button style={updateButtonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={deleteButtonStyle} onClick={handleDelete}>Delete</button>
          </div>

          {/* Submit and Search Buttons */}
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button style={submitButtonStyle} onClick={handleSubmit}>Submit</button>
            <span style={gapStyle}></span>
            <button style={searchButtonStyle} onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const appStyle = {
    backgroundColor: 'black',
    height: '150vh',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <div className="App"
 style={appStyle}>
      <CourierRegistration /> {/* Include the CourierRegistration component */}
    </div>
  );
}

export default App;
