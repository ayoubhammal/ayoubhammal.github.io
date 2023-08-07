import type { Component } from 'solid-js';
import { Router, Route, Routes, A } from "@solidjs/router";
import styles from './style/App.module.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Curriculum from './components/Curriculum';
import Blog from './components/Blog';
import Article from './components/Article';

const App: Component = () => {
    return (
        <div class={styles["container"]}>
            <Header />
            <Router>
                <Routes>
                    <Route path="/" component={Curriculum} />
                    <Route path="/blog" component={Blog} />
                    <Route path="/blog/:name" component={Article} />
                </Routes>
            </Router>
            <Footer />
        </div>
    );
};

export default App;
