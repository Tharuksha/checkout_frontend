import React, { useState } from 'react';
import axios from 'axios';
import Carosel from './Components/Carousel';

const CheckoutPage = () => {
  const [newOrder, setNewOrder] = useState({
    name: '',
    u_id:'',
    contactNumber: '',
    deliveryDate: '',
    shippingAddress: '',
    note: ''
  });
  const [orderId, setOrderId] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
      setNewOrder(response.data); 
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handleSearch = () => {
    fetchOrderDetails();
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setOrderId(value); 
  };

  const handleInputChangeForOrder = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevOrder => ({ ...prevOrder, [name]: value }));
  };

  const addOrder = async () => {
    try {
      await axios.post('http://localhost:8080/api/orders', newOrder);
      fetchOrderDetails();
      setNewOrder({
        username: '',
        u_id:'',
        contactNumber: '',
        deliveryDate: '',
        shippingAddress: '',
        note: ''
      });
      setShowMessage(true);
      setMessage('Order placed successfully');
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
      fetchOrderDetails();
      setShowMessage(true);
      setMessage('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const updateOrder = async () => {
    try {
      await axios.put(`http://localhost:8080/api/orders/${orderId}`, newOrder);
      fetchOrderDetails();
      setShowMessage(true);
      setMessage('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div style={styles.container}>
      <Carosel style={{ marginBottom: '80px' }} />
      {showMessage && <div style={styles.message}>{message}</div>}
      <div style={styles.section}>
        <h2 style={{ marginBottom: '55px' }}>Contact Information</h2>
        <div style={styles.inputContainer}>
        
        <input type="text" placeholder="Name" style={styles.input} name="name" value={newOrder.name} onChange={handleInputChangeForOrder} />

          <input type="text" placeholder="Mobile" style={styles.input} name="contactNumber" value={newOrder.contactNumber} onChange={handleInputChangeForOrder} />
        </div>
      </div>

      <div style={styles.section}>
        <h2></h2>
        <div style={styles.orderDetails}>
          <div> <span style={styles.price}></span></div>
          <div> <span style={styles.price}></span></div>
        </div>
        <div style={styles.total}>
          <div></div>
          <div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={{ marginBottom: '55px' }}>Shipping Method</h2>
        <div style={styles.inputContainer}>
          <input type="text" placeholder="Today" style={styles.input} name="deliveryDate" value={newOrder.deliveryDate} onChange={handleInputChangeForOrder} />
          <input type="text" placeholder="Address" style={styles.input} name="shippingAddress" value={newOrder.shippingAddress} onChange={handleInputChangeForOrder} />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.inputContainer}>
          <input type="text" placeholder="Special Note" style={styles.input} name="note" value={newOrder.note} onChange={handleInputChangeForOrder} />
          <input type="text" placeholder="Order Id" style={styles.input} value={orderId} onChange={handleInputChange} />
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.applyButton} onClick={addOrder}>Place Order</button>
        <button style={styles.cancelButton} onClick={deleteOrder}>Delete Order</button>
        <button style={styles.confirmButton} onClick={updateOrder}>Update Order</button>
        <button style={styles.searchButton} onClick={handleSearch}>Search Order Details</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1700px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'black',
    boxShadow: '0px 0px 80px rgba(0, 0, 0, 0.8)',
    borderRadius: '30px',
    color: 'white'
  },
  section: {
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '10px',
  },
  input: {
    flex: '1',
    marginRight: '10px',
    padding: '8px',
    border: '1px solid #000',
    borderRadius: '20px',
    backgroundColor: 'white',
    color: 'black' 
  },
  orderDetails: {
    marginBottom: '10px',
  },
  price: {
    marginLeft: '10px',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
  },
  applyButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  confirmButton: {
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  searchButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  message: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '5px',
    borderRadius: '5px',
    marginBottom: '5px',
  }
};

export default CheckoutPage;
