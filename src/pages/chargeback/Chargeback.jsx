import './Chargeback.css';
import React, { useState, useRef } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { FaCircleCheck } from "react-icons/fa6";

const Chargeback = () => {

  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    // For now, we'll just show the popup
    setShowPopup(true);

    // Hide the popup after 4 seconds
    setTimeout(() => {
      setShowPopup(false);
      formRef.current.reset();
    }, 4000);
  };

  return ( 
    <div className="chargeback">
      <Navbar header='Chargeback'/>

      <div className="chargeback-form-container">
        <form ref={formRef} action="" className="chargeback-form" onSubmit={handleSubmit}>
          <h2>Chargeback Form</h2>

          <div class="form-item">
            <label for="transactionId">Transaction ID</label>
            <input type="text" placeholder='Transaction Reference' name="transactionId" required id="transactionId" />
          </div>

          <div class="form-item">
            <label for="cardNumber">Card <br /> Number</label>
            <input placeholder='Card Number' type="number" name="cardNumber" id="cardNumber" required />
          </div>

          <div class="form-item">
            <label for="transactionAmount">Transaction <br /> Amount</label>
            <input placeholder='Total Amount' type="number" name="transactionAmount" id="transactionAmount" required />
          </div>

          <div class="form-item">
            <label for="transactionDate">Transaction <br /> Date</label>
            <input type="date" name="transactionDate" id="transactionDate" required />
          </div>

          <div class="form-item">
            <label for="chargebackReason">chargeback<br /> Reason</label>
            <input placeholder='Describe the issue' type="text" name="chargebackReason" id="chargebackReason" required />
          </div>

          <div class="buttons">
            <button type="reset" value="Reset">Cancel</button>

            <button type="submit">Submit</button>
          </div>

          
        </form>
      </div>

      {showPopup && (
        <div className="popup-charge">
          <FaCircleCheck className='check-icon'/>
          <p>Your request has been sent.</p>
        </div>
      )}
      
    </div>
   );
}
 
export default Chargeback;