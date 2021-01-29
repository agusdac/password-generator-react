import React, { useState } from "react"
import { lowercase, numbers, symbols, uppercase } from "../utils/characters"
import ConditionInput from "./ConditionInput"
import ErrorAlert from "./ErrorAlert"
import NumberInput from "./NumberInput"

export default function PasswordGenerator() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState(20)
    const [containsUppercase, setContainsUppercase] = useState(false)
    const [containsLowercase, setContainsLowercase] = useState(false)
    const [containsNumbers, setContainsNumbers] = useState(false)
    const [containsSymbols, setContainsSymbols] = useState(false)
    const [error, setError] = useState("")

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
            setError("Please, check at least one of the boxes.")
        } else if (length < 6 || length > 25) {
            setError(
                "The length of the password must be between 6 and 25 characters.",
            )
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
        const newTextArea = document.createElement("textarea")
        newTextArea.innerHTML = password
        document.body.append(newTextArea)
        newTextArea.select()
        document.execCommand("copy")
        newTextArea.remove()
    }

    return (
        <div className="container">
            <div className="generator">
                <div>
                    <h2>Password Generator</h2>
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
                    label="Password Length"
                    max="25"
                    min="6"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                />
                <ConditionInput
                    id="password-uppercase"
                    label="Includes uppercase"
                    value={containsUppercase}
                    onChange={(e) => setContainsUppercase(e.target.checked)}
                />
                <ConditionInput
                    id="password-lowercase"
                    label="Includes lowercase"
                    value={containsLowercase}
                    onChange={(e) => setContainsLowercase(e.target.checked)}
                />
                <ConditionInput
                    id="password-numbers"
                    label="Includes numbers"
                    value={containsNumbers}
                    onChange={(e) => setContainsNumbers(e.target.checked)}
                />
                <ConditionInput
                    id="password-symbols"
                    label="Includes symbols"
                    value={containsSymbols}
                    onChange={(e) => setContainsSymbols(e.target.checked)}
                />
                <div>
                    <button
                        className="generator-button"
                        onClick={generatePassword}
                    >
                        Generate Password
                    </button>
                </div>
            </div>
        </div>
    )
}
