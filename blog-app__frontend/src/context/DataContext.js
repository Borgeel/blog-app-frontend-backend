import { createContext, useState, useEffect } from "react";

import useAxiosFetch from "../hooks/useAxiosFetch";

import client from "../client";
import { feedQuery } from "../data/data";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // const { data, fetchError, isLoading } = useAxiosFetch(
  //   "http://localhost:3500/posts"
  // );

  // useEffect(() => {
  //   setPosts(data);
  // }, [data]);

  // useEffect(() => {
  //   client
  //     .fetch(
  //       `*[_type == "post"] {
  //         title,
  //         datetime,
  //         body
  //       }`
  //     )
  //     .then((data) => setPosts(data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      client
        .fetch(feedQuery)
        .then((data) => {
          setPosts(data);
          setTimeout(() => {
            setIsLoading(false, 2000);
          }, 1500);
        })
        .catch((err) => {
          setIsLoading(() => {
            setIsLoading(false);
          }, 1500);
          setFetchError(err);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter((post) => {
      return (
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
      );
    });

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
