"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    const isSearchUserName = post.creator.username
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const isSearchPrompt = post.prompt
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const isSearchTag = post.tag
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (isSearchUserName || isSearchPrompt || isSearchTag) {
      return true;
    }
    return false;
  });

  const handleTagClick = (search) => {
    setSearchText(search);
  };

  return (
    <section className="feed">
      <form className="relative w-full justify-center">
        <input
          type="text"
          placeholder="Search for a prompt, tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer text-gray-700 focus:border-blue-600 transition"
        />
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
