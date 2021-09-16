import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

/* global chrome */

function App() {
  const [title, setTitle] = useState("")
  const [url, setURL] = useState("")
  const [tags, setTags] = useState("")
  const [comment, setComment] = useState("")

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0]
      setTitle(tab.title)
      setURL(tab.url)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    fetch(`${process.env.REACT_APP_MEGURO_URL}/_/add`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        url: url,
        tags: tags,
        comment: comment,
      })
    })
      .then(res => window.close())
      .catch(e => console.log(e))
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleURLChange = (event) => {
    setURL(event.target.value)
  }

  const handleTagsChange = (event) => {
    setTags(event.target.value)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="input">
          <input type="url" name="url" value={url} onChange={handleURLChange} placeholder="URL" />
        </div>
        <div className="input">
          <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
        </div>
        <div className="input">
          <input type="text" name="tags" value={tags} onChange={handleTagsChange} placeholder="Tags" />
        </div>
        <div className="input">
          <textarea name="comment" value={comment} onChange={handleCommentChange}></textarea>
        </div>
        <div className="input">
          <input type="submit" value="Add" />
        </div>
      </form>
    </div>
  );
}

export default App;
