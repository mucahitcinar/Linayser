'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
const PromptCardList = ({data, handleTagClick})=>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([]);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleInput = () => {
    const datalist = document.getElementById('jobs');
    const options = Array.from(datalist.options);
  
    const selectedOption = options.find((option) =>
      option.value.toLowerCase().includes(searchText.toLowerCase())
    );
  
    if (selectedOption) {
      setSearchText(selectedOption.value);
    }
  };

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  },[]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="What job do you want to have 🎯"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          list="jobs"
          onInput={handleInput}
        />
       <datalist id="jobs">
        <option value="Software Engineer" />
        <option value="Graphic Designer" />
        <option value="Data Analyst" />
      </datalist>
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed
