import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

/* global chrome */

function App() {
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0]
      document.getElementById("form-title").setAttribute("value", tab.title)
      document.getElementById("form-url").setAttribute("value", tab.url)
    })
  })

  return (
    <div className="App">
      <form action="https://desolate-harbor-23973.herokuapp.com/_/add" method="POST">
        <input type="text" name="title" id="form-title" />
        <input type="url" name="url" id="form-url" />
        <input type="text" name="tags" id="form-tags" />
        <textarea name="comment" id="form-comment"></textarea>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

export default App;
