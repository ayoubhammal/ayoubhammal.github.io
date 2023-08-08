import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { useParams } from '@solidjs/router';
import styles from '../style/Article.module.css';

import "../config/mathJaxConfig";
import "mathjax/es5/tex-mml-svg.js"; 

const Article: Component = () => {
    const params = useParams();
    const [content, setContent] = createSignal(document.createElement("article"), { equals: false });

    createEffect(() => {
        fetch(
            `/articles/${params.name}/content.html`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain"
                }
            }
            ).then(
                (response) => response.text()
            ).then(
                (data: string) => {
                    setContent((content) => {
                        content.innerHTML = data;
                        return content;
                    });
                    MathJax.typeset();
                }
            ).catch(
                (err) => console.error(`Failed to fetch article content: ${err.message}`)
            );
    });

    return (
        <>
            {content()}
        </>
    );
};

export default Article;
