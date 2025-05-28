import React from 'react'
import { motion } from "framer-motion";

export const About = () => {
    return (
    <>
        <motion.div //added motion for style
      className="main-content"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
        <div className="about-page">
          <h2>About TuneFind</h2>
          <p>
            <strong>TuneFind</strong> is a lightweight web app that lets you search the
            iTunes database for music, movies, podcasts, and more.
          </p>
          <p>
            Use filters to refine your search by media type or country. You can also sort results by name or release date to find exactly
            what you're looking for.
          </p>
          <p>
            This app uses the <a href="https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html" target="_blank" rel="noopener noreferrer">iTunes Search API</a> and was built for practice and exploration.
          </p>
          <p>
            Made with ❤️ using React and Material UI.
          </p>
        </div>
        </motion.div>
    </>
        
      );
}
