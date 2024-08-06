import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/update.css';
import NewCurrencyData from '../components/NewCurrencyData';

export default function Update(props) {
    const [currencyType, setCurrencyType] = useState('');
    const [currencyValue, setCurrencyValue] = useState('');
    const [isAddUpdateBtnDisabled, setIsAddUpdateBtnDisabled] = useState(true);
    const [isAddUpdateBtnHovered, setIsAddUpdateBtnHovered] = useState(false);
    const [isAddUpdateBtnTouched, setIsAddUpdateBtnTouched] = useState(false);
    const [isbackBtnTouched, setIsbackBtnTouched] = useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);

    useEffect(() => {
        if (currencyType.length < 1 || String(currencyValue).length < 1) {
            setIsAddUpdateBtnDisabled(true);
        } else {
            setIsAddUpdateBtnDisabled(false);
        }
    }, [currencyType, currencyValue])

    //Changes the add/update button's hovered state to true when the user hovers over it
    const enterHover = () => {
        setIsAddUpdateBtnHovered(true);
    }

    //Changes the add/update button's hovered state to false when the user hovers over it
    const exitHover = () => {
        setIsAddUpdateBtnHovered(false);
    }

    //changes the 'add/update' button's touched state to true when the user touches it
    const addUpdateBtnTouch = () => {
        setIsAddUpdateBtnTouched(true);
    }

    //changes the 'add/update' button's touched state to false when the user removes his finger
    const outOfAddUpdateBtnTouch = () => {
        setIsAddUpdateBtnTouched(false);
    }

    //changes the 'back' button's touched state to true when the user touches it
    const backBtnTouch = () => {
        setIsbackBtnTouched(true);
    }

    //changes the 'back' button's touched state to false when the user removes his finger
    const outOfBackBtnTouch = () => {
        setIsbackBtnTouched(false);
    }

    const updateCurrency = (value) => {
        if (currencyType !== '' && !/[0-9]/.test(currencyType) && value !== ''
            && typeof (value) === 'number' && /[0-9.]/.test(value) && /[^A-Za-z]/.test(value)) {
            const currenciesCopy = structuredClone(props.currenciesArr)
            const existingCurrency = currenciesCopy.find(currency => currency.type === currencyType)

            if (existingCurrency !== undefined) {
                existingCurrency.value = currencyValue;
                props.setCurrenciesArr(currenciesCopy);
            } else {
                const newCurrency = { type: currencyType, value: value };
                currenciesCopy.push(newCurrency)
                props.setCurrenciesArr(currenciesCopy)
            }
        } else {
            setIsErrorShown(true);
        }
    }
    return (
        <div className='update'>
            <h1>Add/Update currency</h1>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {props.currenciesArr.map(currency =>
                        <NewCurrencyData currency={currency} />
                    )}
                </tbody>
            </table>
            <div className='inputs'>
                <input className='currencyInputs' type="text" placeholder='Enter type' onInput={(e) => {
                    const newType = e.target.value;
                    setCurrencyType(newType);
                    setIsErrorShown(false);
                }} />

                <input className='currencyInputs' type="text" placeholder='Enter value' onInput={(e) => {
                    const newValue = Number(e.target.value);
                    setCurrencyValue(newValue);
                    setIsErrorShown(false);
                }} />
            </div>
            {isErrorShown ? <div style={{ color: 'red' }}>Error: currency type cannot contain numbers
                <br />
                currency value must contain numbers only
            </div> : <></>}
            <div className='updatePageBtns'>
                <button id='addUpdate' style={{
                    backgroundColor: isAddUpdateBtnDisabled ? '' :
                        (isAddUpdateBtnHovered ? 'royalblue' :
                            (isAddUpdateBtnTouched ? 'royalblue' : 'dodgerblue')),
                    color: isAddUpdateBtnDisabled ? 'gray' : 'white',
                    cursor: isAddUpdateBtnDisabled ? '' : (isAddUpdateBtnHovered ? 'pointer' : '')
                }}
                    disabled={isAddUpdateBtnDisabled} onClick={() =>
                        updateCurrency(currencyValue)} onMouseOver={enterHover}
                    onMouseOut={exitHover} onTouchStart={addUpdateBtnTouch}
                    onTouchEnd={outOfAddUpdateBtnTouch}>
                    Add/Update</button>

                <Link to='/'>
                    <button id='back' style={{
                        backgroundColor: isbackBtnTouched ? 'rgb(92, 154, 175)' : 'white',
                        color: isbackBtnTouched ? 'white' : 'dodgerblue',
                        border: isbackBtnTouched ? 'none' : '2px solid dodgerblue'
                    }}
                        onTouchStart={backBtnTouch}
                        onTouchEnd={outOfBackBtnTouch}>
                        Back
                    </button>
                </Link>
            </div>
        </div>
    )
}