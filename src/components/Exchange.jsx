import React from 'react';
import '../styles/exchange.css';

export default function Exchange(props) {
    return (
        <div className='exchange' style={{
            width: window.innerWidth >= 1200 ? '415px' :
                (window.innerWidth > window.innerHeight) ? '365px' : '300px'
        }}>
            {/* <div style={{ fontWeight: 'bold' }}>Conversion #{props.exchange.counter}</div> */}
            <div>From: {props.exchange.from}</div>
            <div>  To: {props.exchange.to}</div>
            <div>{props.exchange.amount}={props.exchange.result}</div>
            <br />
            <button className='removeBtn' onClick={() => {
                const exchangeListCopy = structuredClone(props.exchangeList);
                const currentExgIndex = exchangeListCopy.findIndex(exchange =>
                    exchange.amount === props.exchange.amount);
                exchangeListCopy.splice(currentExgIndex, 1);
                props.setExchangeList(exchangeListCopy);
            }}>Remove</button>
        </div >
    )
}
