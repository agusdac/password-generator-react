import React from 'react'

export default function LanguageSelector({setLanguage}) {
    return (
        <div className="language">
            <select onChange={e => setLanguage(e)}>
                <option value="en">En - English</option>
                <option value="es">Es - Castellano</option>
                <option value="ca">Ca - Català</option>
            </select>
        </div>
    )
}
