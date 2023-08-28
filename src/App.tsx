import type { Component } from 'solid-js';
import { lazy } from 'solid-js';
import { Router, Route, Routes, A } from "@solidjs/router";
import styles from './style/App.module.css';

import Header from './components/Header';
import Footer from './components/Footer';

const Curriculum = lazy(() => import('./components/Curriculum'));
const Article = lazy(() => import("./components/Article"));
const Blog = lazy(() => import( './components/Blog'));


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
