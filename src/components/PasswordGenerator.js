import React, { useState } from "react"
import LocalizedStrings from "react-localization"
import { lowercase, numbers, symbols, uppercase } from "../utils/characters"
import ConditionInput from "./ConditionInput"
import ErrorAlert from "./ErrorAlert"
import NumberInput from "./NumberInput"
import strings from '../utils/localizedStrings'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordGenerator({language="es"}) {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(20)
    const [containsUppercase, setContainsUppercase] = useState(true)
    const [containsLowercase, setContainsLowercase] = useState(true)
    const [containsNumbers, setContainsNumbers] = useState(true)
    const [containsSymbols, setContainsSymbols] = useState(true)
    const [error, setError] = useState("")
    const localizedStrings = new LocalizedStrings(strings)

    const generateCharacterList = () => {
        let characterList = ""
        if (containsUppercase) characterList += uppercase
        if (containsLowercase) characterList += lowercase
        if (containsNumbers) characterList += numbers
        if (containsSymbols) characterList += symbols
        return characterList
    }

    const generatePassword = () => {
        let noneChecked =
            !containsUppercase &&
            !containsLowercase &&
            !containsNumbers &&
            !containsSymbols
        if (noneChecked) {
            setError(localizedStrings.checkError)
        } else if (length < 6 || length > 25) {
            setError(localizedStrings.lengthError)
        } else {
            let characterList = generateCharacterList()
            let password = ""
            for (let i = 0; i < length; i++) {
                let randomIndex = Math.floor(
                    Math.random() * characterList.length,
                )
                password += characterList.charAt(randomIndex)
            }
            setPassword(password)
            setError("")
        }
    }

    const copyToClipboard = () => {
        if (password === '') {
            setError(localizedStrings.emptyError)
        } else {
            const newTextArea = document.createElement("textarea")
            newTextArea.innerHTML = password
            document.body.append(newTextArea)
            newTextArea.select()
            document.execCommand("copy")
            newTextArea.remove()
            notify(localizedStrings.copied)
        }
    }

    const notify = message => {
        toast.info(message, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    localizedStrings.setLanguage(language)
    return (
        <div className="container">
            <div className="generator">
                <div>
                    <h2>{localizedStrings.title}</h2>
                </div>
                <div className="password-container">
                    <p>{password}</p>
                    <button onClick={copyToClipboard} className="copy-button">
                        <i className="far fa-clipboard" />
                    </button>
                </div>
                {error && <ErrorAlert error={error} />}
                <NumberInput
                    id="password-length"
                    label={localizedStrings.length}
                    max="25"
                    min="6"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <ConditionInput
                    id="password-uppercase"
                    label={localizedStrings.uppercase}
                    value={containsUppercase}
                    onChange={(e) => setContainsUppercase(e.target.checked)}
                />
                <ConditionInput
                    id="password-lowercase"
                    label={localizedStrings.lowercase}
                    value={containsLowercase}
                    onChange={(e) => setContainsLowercase(e.target.checked)}
                />
                <ConditionInput
                    id="password-numbers"
                    label={localizedStrings.numbers}
                    value={containsNumbers}
                    onChange={(e) => setContainsNumbers(e.target.checked)}
                />
                <ConditionInput
                    id="password-symbols"
                    label={localizedStrings.symbols}
                    value={containsSymbols}
                    onChange={(e) => setContainsSymbols(e.target.checked)}
                />
                <div>
                    <button
                        className="generator-button"
                        onClick={generatePassword}
                    >
                        {localizedStrings.generate}
                    </button>
                </div>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick    
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
            </div>
        </div>
    )
}
