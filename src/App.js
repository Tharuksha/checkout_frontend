import React, { useState } from 'react';
import 'react-datetime/css/react-datetime.css';
import './App.css';
import Datetime from 'react-datetime';
import axios from 'axios';
import { useSpring, animated } from 'react-spring'; // For animation
import Modal from 'react-modal'; 

Modal.setAppElement('#root');

const OrderPlacing = () => {
  const [orderId, setOrderId] = useState('');
  const [orderDate, setorderDate] = useState(null);
  const [book_id, setBookId] = useState('');
  const [userid, setUserId] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [note, setNote] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState(null);


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
    borderRadius: '30px',
    background: 'green',
    color: 'white',
    cursor: 'pointer',
  };

  const titleAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
  });
// Modal styles with increased size and improved layout
const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px', // Increased padding for larger modal
    borderRadius: '15px', // Softer corners
    width: '60%', // Increased width
    maxWidth: '800px', // Maximum width to ensure it fits the screen
    maxHeight: '85vh', // Ensure modal isn't too tall
    overflowY: 'auto', // Allow vertical scrolling
    backgroundColor: '#f5f5f5', // Light gray background
  },
};

// Styles for modal content with proper gaps between fields
const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Align fields to the left
  gap: '20px', // Larger gap for spacing between elements
  padding: '20px', // Padding for inner content
};

// Button styles for modal actions
const modalButtonStyle = {
  padding: '10px 20px', // Padding for button
  borderRadius: '15px', // Softer corners
  backgroundColor: 'green', // Button background color
  color: 'white', // Button text color
  cursor: 'pointer', // Change cursor on hover
};

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
          book_id,
          userid,
          contactNumber,
          orderDate: orderDate ?orderDate.format('YYYY-MM-DD') : '',
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
      const order = {
        book_id,
        userid,
        contactNumber,
        orderDate: orderDate ? orderDate.format('YYYY-MM-DD') : '',
        shippingAddress,
        note,
      };

      // Submit the order via POST request
      await axios.post('http://localhost:8080/api/orders', order);

      // Set the submitted order and open the modal
      setSubmittedOrder(order);
      setIsModalOpen(true); // Open the modal

      alert('Order submitted successfully');
    } catch (error) {
      alert('Error submitting order');
    }
};
const onClose = () => {
  setIsModalOpen(false); // Set modal to false to close it
};

  const handleSearch = async () => {
    if (orderId) {
      try {
        const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
        if (response.data) {
          const order = response.data;
          setBookId(order.book_id);
          setUserId(order.userid);
          setContactNumber(order.contactNumber);
          setNote(order.note);
          setShippingAddress(order.shippingAddress);
          setorderDate(order.orderDate ? Datetime.moment(order.orderDate) : null);
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
        <animated.h2 style={{ fontWeight: 'bold', fontSize: '24px' }} >
          Place Your Order
        </animated.h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="BookID"
              style={{ flex: 1 }}
              value={book_id}
              onChange={(e) => setBookId(e.target.value)}
            />
          </div>

          <div style={textFieldStyle}>
            <input
              type="text"
              placeholder="UserID"
              style={{ flex: 1 }}
              value={userid}
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
              placeholder="Note"
              style={{ flex: 1 }}
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              value={orderDate}
              onChange={setorderDate}
              inputProps={{ placeholder: 'Select Date' }}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button style={buttonStyle} onClick={handleSubmit}>Place Order</button>
            
            <span style={gapStyle}></span>
            <button style={buttonStyle} onClick={handleSearch}>Search Order</button>
            <span style={gapStyle}></span>
            <button style={buttonStyle} onClick={handleUpdate}>Update Order</button>
            <span style={gapStyle}></span>
            
          </div>
          
      {/* Modal for order receipt */}
      <Modal
      isOpen={isModalOpen}
      onRequestClose={onClose}
      style={modalStyle}
    >
      {submittedOrder && (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '24px' }}>
            Order Receipt
          </h2>
          
          {/* Order details inside text fields, read-only */}
          <input type="text" value={`Book ID: ${submittedOrder.book_id}`} readOnly style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" value={`User ID: ${submittedOrder.userid}`} readOnly style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" value={`Contact Number: ${submittedOrder.contactNumber}`} readOnly style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" value={`Order Date: ${submittedOrder.orderDate}`} readOnly style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" value={`Shipping Address: ${submittedOrder.shippingAddress}`} readOnly style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" value={`Note: ${submittedOrder.note}`} readOnly style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}> {/* Container for buttons with space between them */}
            <button style={{ padding: '10px 20px', borderRadius: '15px', backgroundColor: 'green', color: 'white', cursor: 'pointer' }} onClick={onClose}>
              Close
            </button>
            
          </div>
        </div>
      )}
    </Modal>
        </div>
        
      </div>
    </>
  );
};

export default OrderPlacing;