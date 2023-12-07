import React from 'react'
import './selectLanguageItem.scss'

export const SelectLanguageItem = ({ language }) => {

    const getFlag = (code) => {
        return code
            .split('')
            .map(letter => letter.charCodeAt(0) % 32 + 0x1F1E5)
            .map(x => String.fromCodePoint(x))
            .join('')
    }

    return (
        <div className="d-flex selectLanguageItem">
            <span>{getFlag(language.code)}</span>
            <span>{language.name}</span>
        </div>
    )
}
