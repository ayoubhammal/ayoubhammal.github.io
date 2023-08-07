import type { Component } from 'solid-js';
import style from '../style/Header.module.css';

const Header: Component = () => {
    return (
        <header class={style.header}>
            <div class={style["header-banner"]}>
            </div>
            <nav class={style["header-nav-container"]}>
                <div class={style["header-nav-links"]}>
                    <a href="/">Home</a>
                    <a href="/blog">Blog</a>
                </div>
            </nav>
            <hr/>
        </header>
    );
};

export default Header;
