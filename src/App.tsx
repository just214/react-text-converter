import React, { useState, useRef, useEffect, useMemo } from "react";
import api from "./api";
import { useCopy } from "./useCopy";

const App: React.FC = () => {
  const [outputRef, copyText, copied] = useCopy();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isMultiline, setIsMultiline] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSetInput(e: React.FormEvent<HTMLTextAreaElement>) {
    setInput(e.currentTarget.value);
  }

  function convertText(method: (text: string) => string) {
    if (isMultiline) {
      const stringArray = input.split("\n");
      const newString = stringArray.reduce((accum, value) => {
        return `${accum}${method(value)}\n`;
      }, "");
      setOutput(newString);
    } else {
      const newString = method(input);
      setOutput(newString);
    }
  }

  function clearText() {
    setInput("");
    setOutput("");
  }

  function handleSetIsMultiline() {
    setIsMultiline(value => !value);
  }

  // IMPLEMENTATION 1
  // DISADVANTAGE: Reran when any state changes
  // SOLUTION: WRAP IN USEMEMO
  // const characterCount = input.length;
  // const wordCount = !input ? 0 : input.trim().split(/\s+/).length;
  // const lineCount = !input ? 0 : input.split(/\r\n|\r|\n/).length;

  const characterCount = useMemo(() => {
    console.log("RENDERED");
    return input.length;
  }, [input]);
  const wordCount = useMemo(
    () => (!input ? 0 : input.trim().split(/\s+/).length),
    [input]
  );
  const lineCount = useMemo(
    () => (!input ? 0 : input.split(/\r\n|\r|\n/).length),
    [input]
  );

  return (
    <div className="app">
      <header>
        <h1>React Text Converter</h1>
      </header>
      <main>
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleSetInput}
          rows={5}
          placeholder="Type here."
        />

        <section className="counts-section">
          <p>Characters: {characterCount}</p>
          <p>Words: {wordCount}</p>
          <p>Lines: {lineCount}</p>
        </section>

        <div className="conversion-buttons">
          {api.map(option => {
            return (
              <button
                key={option.label}
                onClick={() => convertText(option.method)}
                disabled={!input}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <textarea
          ref={outputRef}
          placeholder="Your converted text will show up here."
          disabled={true}
          value={output}
          rows={5}
        />

        <label htmlFor="multiline-checkbox">
          <input
            id="multiline-checkbox"
            type="checkbox"
            value="multiline"
            onChange={handleSetIsMultiline}
            checked={isMultiline}
          />
          Multiline
        </label>

        <div className="action-buttons">
          <button disabled={!output} onClick={copyText}>
            {copied ? "Copied!" : "Copy"}
          </button>
          <button disabled={!input} onClick={clearText}>
            Clear
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
