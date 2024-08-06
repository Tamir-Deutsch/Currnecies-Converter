import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Exchange from '../components/Exchange';
import { useEffect } from 'react';
import '../styles/home.css'

export default function Home(props) {
    const [amount, setAmount] = useState('');
    const [from, setFrom] = useState('₪ Israeli Shekel')
    const [to, setTo] = useState('₪ Israeli Shekel')
    const [isConvertBtnDisabled, setIsConvertBtnDisabled] = useState(true);
    const [isConvertBtnHovered, setIsConvertBtnHovered] = useState(false);
    const [isConvertBtnTouched, setIsConvertBtnTouched] = useState(false);
    const [exchangeList, setExchangeList] = useState([]);
    const [isExchangeListClicked, setIsExchangeListClicked] = useState(false);
    const [isAddUpdateBtnTouched, setIsAddUpdateBtnTouched] = useState(false);
    const [isListBtnTouched, setIsListBtnTouched] = useState(false);
    const [isErrorShown, setIsErrorShown] = useState(false);
    // const [exchangeCounter, setExchangeCounter] = useState(1);

    const convertBtnStyle = {
        backgroundColor:
            isConvertBtnDisabled ? '' : (isConvertBtnHovered ? 'royalblue' :
                (isConvertBtnTouched ? 'royalblue' : 'dodgerblue')),
        color: isConvertBtnDisabled ? 'gray' : 'white',
        cursor: isConvertBtnDisabled ? '' : (isConvertBtnHovered ? 'pointer' : '')
    };

    const addUpdateBtnStyle = {
        backgroundColor: isAddUpdateBtnTouched ? 'rgb(92, 154, 175)' : 'white',
        color: isAddUpdateBtnTouched ? 'white' : 'dodgerblue',
        border: isAddUpdateBtnTouched ? 'none' : '2px solid dodgerblue'
    };

    const listBtnStyle = {
        backgroundColor: isListBtnTouched ? 'rgb(92, 154, 175)' : 'white',
        color: isListBtnTouched ? 'white' : 'dodgerblue',
        border: isListBtnTouched ? 'none' : '2px solid dodgerblue'
    };

    useEffect(() => {
        if (amount.length < 1) {
            setIsConvertBtnDisabled(true);
        } else {
            setIsConvertBtnDisabled(false);
        }
    }, [amount])

    const calculate = () => {
        if (/[^0-9.]/.test(amount) || /[A-Za-z]/.test(amount)) {
            setIsErrorShown(true);
        } else {
            const fromCurrency = props.currenciesArr.find(coin => coin.type === from)
            const toCurrency = props.currenciesArr.find(coin => coin.type === to)
            // console.log(fromCurrency);
            // console.log(toCurrency);
            let result = (Number(fromCurrency.value) / Number(toCurrency.value)) * Number(amount);
            alert(result);
            addToExchangeList(result)
        }
    }

    const addToExchangeList = (result) => {
        // setExchangeCounter(prevState => prevState + 1)

        const exchangeListCopy = structuredClone(exchangeList);
        const newConvert = {
            // counter: exchangeCounter,
            from: from,
            to: to,
            amount: amount,
            result: result
        }

        exchangeListCopy.push(newConvert);
        setExchangeList(exchangeListCopy);
    }

    const enterHover = () => {
        setIsConvertBtnHovered(true);
    }

    const exitHover = () => {
        setIsConvertBtnHovered(false);
    }

    const convertBtnTouch = () => {
        setIsConvertBtnTouched(true);
    }

    const outOfConvertBtnTouch = () => {
        setIsConvertBtnTouched(false);
    }

    const addUpdateBtnTouch = () => {
        setIsAddUpdateBtnTouched(true);
    }

    const outOfAddUpdateBtnTouch = () => {
        setIsAddUpdateBtnTouched(false)
    }

    const listBtnTouch = () => {
        setIsListBtnTouched(true);
    }

    const outOfListBtnTouch = () => {
        setIsListBtnTouched(false)
    }

    return (
        <div className='home'>
            <h1>Exchange</h1>
            <input className='amountInpt' type="text" placeholder='Insert any amount...' onInput={(e) => {
                const amountValue = e.target.value;
                setAmount(amountValue);
                setIsErrorShown(false);
            }} />

            {isErrorShown ? <div style={{ color: 'red' }}>*Amount must contain numbers only
            </div> : <></>}

            <div className='from'>
                <p>From:</p>
                <label htmlFor="currency1"><select id="currency1" className='currency'
                    onChange={(e) => {
                        const type1 = e.target.value;
                        setFrom(type1);
                    }}>
                    {
                        props.currenciesArr.map(currency => <option value={currency.type}>
                            {currency.type}</option>)
                    }
                </select>
                </label>
            </div>
            
            <div className='to'>
                <p>To:</p>
                <label htmlFor="currency2"><select id="currency2" className='currency'
                    onChange={(e) => {
                        const type2 = e.target.value;
                        setTo(type2);
                    }}>
                    {
                        props.currenciesArr.map(currency => <option value={currency.type}>
                            {currency.type}</option>)
                    }
                </select>
                </label>
            </div>

            <button
                className='convertBtn' disabled={isConvertBtnDisabled} style={convertBtnStyle}
                onClick={calculate} onMouseOver={enterHover} onMouseOut={exitHover}
                onTouchStart={convertBtnTouch} onTouchEnd={outOfConvertBtnTouch}>
                Convert</button>

            <div className='btns'>
                <Link to='/update'>
                    <button className='addUpdateBtn' style={addUpdateBtnStyle}
                        onTouchStart={addUpdateBtnTouch} onTouchEnd={outOfAddUpdateBtnTouch}>
                        Add/Update currency</button>
                </Link>

                <button className='listBtn' style={listBtnStyle}
                    onClick={() => setIsExchangeListClicked((prevState) => !prevState)}
                    onTouchStart={listBtnTouch} onTouchEnd={outOfListBtnTouch}>
                    View exchange list
                </button>
            </div>

            {
                isExchangeListClicked ?
                    <div>{exchangeList.map((exchange) => <Exchange exchange={exchange}
                        exchangeList={exchangeList} setExchangeList={setExchangeList} />)}
                    </div> : <></>
            }
        </div >
    )
}