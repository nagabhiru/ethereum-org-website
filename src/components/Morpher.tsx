import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Link from "./Link"

const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  &:hover {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};
  }
  &.active {
    font-weight: bold;
  }
`

const Morpher = () => {
  const [state, setState] = useState({
    text: "Ethereum",
    words: [
      "以太坊",
      "イーサリアム",
      "Etérium",
      "이더리움",
      "اتریوم",
      "Αιθέριο",
      "Eterijum",
      "إثيريوم",
      "อีเธอเรียม",
      "Эфириум",
      "इथीरियम",
      "ಇಥೀರಿಯಮ್",
      "אתריום",
      "Ξ",
      "ইথেরিয়াম",
      "எதீரியம்",
      "ఇథిరియూమ్",
    ],
  })

  // loops over chars to morph a text to another
  const morpher = (start: string, end: string): void => {
    // array of chars to randomly morph the text between start and end
    const chars = [
      "a",
      "b",
      "c",
      "d",
      "x",
      "y",
      "z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "{",
      "}",
      "%",
      "$",
      "?",
      "!",
    ]
    // duration of the global morph
    const duration = 3
    // speed of the morph for each letter
    const frameRate = 30

    // text variables
    const textString = start.split("")
    const result = end.split("")
    const slen = textString.length
    const rlen = result.length

    // time variables
    let present = new Date()
    let past = present.getTime()
    let count = 0
    let spentTime = 0
    // splitTime  = milliseconds / letters
    let splitTime = (duration * 70) / Math.max(slen, rlen)

    function update() {
      // Update present date and spent time
      present = new Date()
      spentTime += present.getTime() - past

      // Random letters
      for (let i = count; i < Math.max(slen, rlen); i++) {
        const random = Math.floor(Math.random() * (chars.length - 1))
        // Change letter
        textString[i] = chars[random]
      }

      // Morph letters from start to end
      if (spentTime >= splitTime) {
        // Update count of letters to morph
        count += Math.floor(spentTime / splitTime)
        // Morphing
        for (let j = 0; j < count; j++) {
          textString[j] = result[j] || ""
        }
        // Reset spent time
        spentTime = 0
      }

      // Update DOM
      setState({ ...state, text: textString.join("") })

      // Save present date
      past = present.getTime()

      // Loop
      if (count < Math.max(slen, rlen)) {
        // Only use a setTimeout if the frameRate is lower than 60FPS
        // Remove the setTimeout if the frameRate is equal to 60FPS
        morphTimeout = setTimeout(() => {
          window.requestAnimationFrame(update)
        }, 1000 / frameRate)
      }
    }

    // Start loop
    update()
  }

  let morphTimeout: NodeJS.Timeout

  useEffect(() => {
    let counter = 0

    const morphInterval = setInterval(() => {
      const start = state.text
      const end = state.words[counter]

      morpher(start, end)

      if (counter < state.words.length - 1) {
        counter++
      } else {
        counter = 0
      }
    }, 3000)

    return () => {
      clearInterval(morphInterval)
      clearTimeout(morphTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NavLink to="/languages/">
      <span>{state.text}</span>
    </NavLink>
  )
}

export default Morpher
