import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';
import { formatMoney, calculateAmortization } from '../../utils/loans';

const AmortizationItem = ({ index, monthlyPayment, principalPmt, interestPmt, loanBalance }) => {
  return (
    <tr>
      <th scope="row">{ index+1 }</th>
      <td>{ formatMoney(monthlyPayment) }</td>
      <td>{ formatMoney(principalPmt) }</td>
      <td>{ formatMoney(interestPmt) }</td>
      <td>{ formatMoney(loanBalance) }</td>
    </tr>
  );
}

const AmortizationList = ({ data }) => {
  return data.map((monthData, index) => (
      <AmortizationItem
        key={ `mo${index+1}`}
        index          = { index }
        monthlyPayment = { monthData.monthlyPayment }
        principalPmt   = { monthData.principalPmt }
        interestPmt    = { monthData.interestPmt }
        loanBalance    = { monthData.loanBalance }
      />
  ));
}

const LoanAmortization = ({ rate, duration, principal, payment, closeHandler, isOpen }) => {

  let rateMonthly = rate / 12 / 100;
  let loanTermMonths = duration * 12; 
  let amortization = calculateAmortization(payment, loanTermMonths, rateMonthly, principal);
  console.log(amortization);
  
  return (
    <Modal
      isOpen = { isOpen }
      toggle = { closeHandler }
      size   = 'lg'
    >
      <ModalHeader
        toggle = { closeHandler }
      >
        Amortization Schedule
      </ModalHeader>

      <ModalBody>
        <Table>
          <thead>
            <tr>
              <th>Payment #</th>
              <th>Payment</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Balance</th>
            </tr>
          </thead>
          
          <tbody>
            <AmortizationList
              data = { amortization }
            />
          </tbody>
        </Table>
      </ModalBody>

      <ModalFooter>
        <Button
          color   = "secondary"
          onClick = { closeHandler }
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default LoanAmortization;
