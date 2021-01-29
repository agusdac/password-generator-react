import React from 'react'
import LocalizedStrings from 'react-localization'
import strings from '../utils/localizedStrings'

export default function Footer() {
    const localizedStrings = new LocalizedStrings(strings)
    return (
        <div className="footer">
            <p>{localizedStrings.developed}</p>
        </div>
    )
}
