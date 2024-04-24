import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import './App.css';
import Datetime from 'react-datetime';
import axios from 'axios';
import { useSpring, animated } from 'react-spring'; // For animation

const OrderPlacing = () => {
  const [orderId, setOrderId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [note, setNote] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const textFieldStyle = {
    padding: '3px',
    margin: '5px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '60%',
  };

  const boxStyle = {
    width: '50%',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    margin: 'auto',
    background: 'white',
  };

  const gapStyle = {
    padding: '0 10px',
  };

  const buttonStyle = {
    padding: '10px',
    borderRadius: '15px',
    background: 'green',
    color: 'white',
    cursor: 'pointer',
  };

  const titleAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });

  const handleDelete = async () => {
    if (orderId) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
        alert('Order deleted successfully');
      } catch (error) {
        alert('Error deleting order');
      }
    } else {
      alert('Please provide a valid Order ID to delete.');
    }
  };

  const handleUpdate = async () => {
    if (orderId) {
      try {
        await axios.put(`http://localhost:8080/api/orders/${orderId}`, {
          bookId,
          userId,
          contactNumber,
          deliveryDate: deliveryDate ? deliveryDate.format('YYYY-MM-DD') : '',
          shippingAddress,
          note,
        });
        alert('Order updated successfully');
      } catch (error) {
        console.error('Error updating order:', error);
        alert('An error occurred while updating the order.');
      }
    } else {
      alert('Please provide a valid Order ID to update.');
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/api/orders', {
        bookId,
        userId,
        contactNumber,
        deliveryDate: deliveryDate ? deliveryDate.format('YYYY-MM-DD') : '',
        shippingAddress,
        note,
      });
      alert('Order submitted successfully');
    } catch (error) {
      alert('Error submitting order');
    }
  };

  const handleSearch = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
        if (response.data) {
          const order = response.data;
          setBookId(order.bookId);
          setUserId(order.userId);
          setContactNumber(order.contactNumber);
          setShippingAddress(order.shippingAddress);
          setNote(order.note);
          setDeliveryDate(order.deliveryDate ? Datetime.moment(order.deliveryDate) : null);
          alert('Order found');
        } else {
          alert('Order not found');
        }
      } catch (error) {
        console.error('Error searching for order:', error);
        alert('Error searching for order.');
      }
    } else {
      alert('Please provide a valid Order ID to search.');
    }
  };

  return (
    <>
      <div style={boxStyle} marginTop >
        <animated.h2 style={titleAnimation}>
          Place Your Order
        </animated.h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="OrderID"
              style={{ flex: 1 }}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>

          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="BookID"
              style={{ flex: 1 }}
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>

          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="UserID"
              style={{ flex: 1 }}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="Contact Number"
              style={{ flex: 1 }}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="Shipping Address"
              style={{ flex: 1 }}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </div>

          <div style={{ ...textFieldStyle, flexDirection: 'row' }}>
            <Datetime
              value={deliveryDate}
              onChange={setDeliveryDate}
              inputProps={{ placeholder: 'Select Delivery Date' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button style={buttonStyle} onClick={handleSubmit}>Place Order</button>
            <span style={gapStyle}></span>
            <button style={buttonStyle} onClick={handleSearch}>Search</button>
            <span style={gapStyle}></span>
            <button style={buttonStyle} onClick={handleUpdate}>Update</button>
            <span style={gapStyle}></span>
            <button style={buttonStyle} onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPlacing;
