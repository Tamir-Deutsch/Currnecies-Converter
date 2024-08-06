import React from 'react'
import '../styles/newCurrencyData.css'

export default function NewCurrencyData(props) {
    return (
        <tr>
            <td>{props.currency.type}</td>
            <td>{props.currency.value}</td>
        </tr>
    )
}
