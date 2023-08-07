import type { Component } from 'solid-js';
import style from '../style/Header.module.css';

const Header: Component = () => {
    return (
        <header class={style.header}>
            <div class={style["header-banner"]}>
            </div>
            <nav class={style["header-nav-container"]}>
                <div class={style["header-nav-links"]}>
                    <a href="index.html">Home</a>
                    <a href="#publications">Publications</a>
                    <a href="#projects">Projects</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>
            <hr/>
        </header>
    );
};

export default Header;
