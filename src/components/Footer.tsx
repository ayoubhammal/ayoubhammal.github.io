import type { Component } from 'solid-js';
import style from '../style/Footer.module.css';

const Footer: Component = () => {
    return (
        <footer class={style["footer"]}>
            <hr/>
            <div class={style["footer-container"]}>
                <div class={style["footer-name"]}>
                    Ayoub Hammal
                </div>
                <div class={style["footer-year"]}>
                    Last updated: June, 2024
                </div>
            </div>
        </footer>
    );
};

export default Footer;

