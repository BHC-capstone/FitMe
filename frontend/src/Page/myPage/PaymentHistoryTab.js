import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentHistoryTab() {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    setPayments([
      {
        id: 1,
        date: '2021-01-01',
        amount: 10000,
        method: '신용카드',
      },
      {
        id: 2,
        date: '2021-01-02',
        amount: 20000,
        method: '신용카드',
      },
    ]);
  }, []);

  //   useEffect(() => {
  //     const fetchPayments = async () => {
  //       const response = await axios.get('/api/payments');
  //       setPayments(response.data);
  //     };
  //     fetchPayments();
  //   }, []);

  if (payments.length === 0) {
    return <div>결제내역 Loading...</div>;
  }

  return (
    <div className="payment-history-tab">
      <h2>결제내역</h2>
      {payments.map(payment => (
        <div key={payment.id}>
          <p>결제일자: {payment.date}</p>
          <p>결제금액: {payment.amount}</p>
          <p>결제수단: {payment.method}</p>
        </div>
      ))}
    </div>
  );
}

export default PaymentHistoryTab;
