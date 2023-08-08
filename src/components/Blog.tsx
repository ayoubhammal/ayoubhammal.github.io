import type { Component } from 'solid-js';
import { createSignal, createEffect, mergeProps, Index, Show } from 'solid-js';
import { A } from "@solidjs/router";

import styles from '../style/Blog.module.css';

type ArticleData = {
    title?: string,
    name?: string,
};

const Blog: Component = () => {
    const [articleData, setArticlesData] = createSignal([] as ArticleData[]);

    createEffect(() => {
        fetch(
            "/articles/list.json",  
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(
            (response) => response.json()
        ).then(
            (data) => {
                if (!Array.isArray(data)) {
                    throw new TypeError(`Expected article names list of type string[], got data of type ${typeof(data)}`);
                }
                setArticlesData(data);
            }
        ).catch(
            (err) => console.error(`Failed to fetch article names list: ${err.message}`)
        )
    });

    return (
        <main class="main">
            <h1>Articles</h1>
            <hr />
            <Show 
                when={articleData().length}
                fallback={<div>Empty, what a shame.</div>}
            >
                <Index each={articleData()}>
                {
                    (data, i) => <ArticleCard title={data().title} name={data().name} />
                }
                </Index>
            </Show>
        </main>
    );
}

const ArticleCard: Component<ArticleData> = (props) => {
    const mergedProps: {title: string, name: string | null} = mergeProps(
        {
            title: "Missing title",
            name: null,
        },
        props
    );
    return (
        <A href={`/blog/${mergedProps.name}`}>
            <div class={styles["article-card"]}>
                    <img class={styles["article-card-image"]} src={`/articles/${mergedProps.name}/image.jpeg`} alt={mergedProps.title} />
                    <h2 class={styles["article-card-title"]}>{mergedProps.title}</h2>
            </div>
        </A>
    );
};

export default Blog;
