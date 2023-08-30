import { createContext, useContext, useState } from 'react';
const BlogContext = createContext();
export const useBlogContext = () => {
  return useContext(BlogContext);
};
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  return (
    <BlogContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogContext.Provider>
  );
};
