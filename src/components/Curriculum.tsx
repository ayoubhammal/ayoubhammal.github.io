import type { Component } from 'solid-js';
import styles from '../style/Curriculum.module.css';

const Curriculum: Component = () => {
    return (
        <main class="main">
            <h1>Ayoub Hammal</h1>
            <hr/>
            Computer Science student, Artificial Intelligence/Data Science enthusiast.
            <section>
                <h2 id="contact">Contact</h2>
                <hr/>
                <ul>
                    <li>
                        &lt;first name&gt;&lt;family name&gt;&lt;at&gt;gmail&lt;dot&gt;com
                    </li>
                    <li>
                        <a href="https://www.github.com/ayoubhammal">My github</a>
                    </li>
                </ul>
            </section>
            <section>
                <h2>Education</h2>
                <hr/>
                <ul>
                    <li>
                        <div class={styles["item-title"]}>
                            <span>Paris-Saclay University</span> <span>2022 - to this day</span>
                        </div>
                        <div class={styles["item-description"]}>
                            Master 1 in Artificial Intellignece. Valedictorian, Excellence honors.
                        </div>
                    </li>

                    <li>
                        <div class={styles["item-title"]}>
                            <span>USTHB, Alger</span> <span>2021 - 2022</span>
                        </div>
                        <div class={styles["item-description"]}>
                            Master 1 in Intelligent Computer Systems. Valedictorian, Very Good honors.
                        </div>
                    </li>

                    <li>
                        <div class={styles["item-title"]}>
                            <span>USTHB, Alger</span> <span>2018 - 2021</span>
                        </div>
                        <div class={styles["item-description"]}>
                            Bachelor’s degree in Computer Science. Valedictorian, Excellence honors.
                        </div>
                    </li>

                    <li>
                        <div class={styles["item-title"]}>
                            <span>Baccalaureate</span> <span>2017 - 2018</span>
                        </div>
                        <div class={styles["item-description"]}>
                            Mathematics option. Very Good honors.
                        </div>
                    </li>
                </ul>
            </section>
            <section>
                <h2 id="publications">Publications</h2>
                <hr/>
                <ul>
                    <li>
                        <b>Ayoub Hammal</b>, Mehdi Lerari, Khaled Zeraoulia and Youcef Hammal. <em>"An efficient resource allocation technique in Fog Environment"</em>, to appear in Springer Proceedings LNNS 646 (Lecture Notes in Networks and Systems) of ISDA 2022: 22nd International Conference on Intelligent Systems Design and Applications (Online), Seattle, WA, United States, December 12-14, 2022.
                    </li>
                    <li>
                        Khaled Zeraoulia, <b>Ayoub Hammal</b>, Mehdi Lerari and Youcef Hammal. <em>"Stable Matching based Resource Allocation for Large-Scale Fog Computing"</em>, accepted on 03 April 2023 to appear in the International Journal of Computer Information Systems and Industrial Management Applications (IJCISIM - https://www.mirlabs.net/ijcisim/).
                    </li>
                </ul>
            </section>
            <section>
                <h2 id="projects">Projects and Academic work</h2>
                <hr/>
                <ul>
                    <li>
                        <div class={styles["item-title"]}>
                            <span><b>Research Internship at INRAE, AgroParisTech</b>: <em>Construction of a named-entities recognition system for out-of-vocabulary entities</em></span> <span><em>2023</em></span>
                        </div>
                        <div class={styles["item-description"]}>
                            <ul>
                                <li>Implementation of state of the art NER models based on CLNER paper.</li>
                                <li>Proposal of an improved framework using enriched LLM-generated contexts.</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class={styles["item-title"]}>
                            <span><b>Research Internship at INRAE, AgroParisTech</b>: <em>Enrich dietary data to make informed recommendations</em></span> <span><em>2023</em></span>
                        </div>
                        <div class={styles["item-description"]}>
                            <ul>
                                <li>Construction of knowledge base around food consumption habits based on INCA2 survey.</li>
                                <li>Elaboration of a filtering system to validate food recommendations based on user profiles.</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class={styles["item-title"]}>
                            <span><b>Research Internship at LISN, Paris Saclay</b>: <em>Study of generalization bound of loss functions and their consistency</em></span> <span><em>2023</em></span>
                        </div>
                        <div class={styles["item-description"]}>
                            <ul>
                                <li>Study of generalization error of loss function and their different bounds.</li>
                                <li>Study of the Fisher Consistency property of loss functions.</li>
                                <li>Proposal of a new multiclass SVM loss function, and study of its Fisher Consistency property.</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class={styles["item-title"]}>
                            <span><b>Research Internship at Laboratoire des Systèmes Informatiques (LSI), USTHB, Algiers</b>: <em>Design and implementation of a resource allocation technique for an IoT-Fog/Edge Computing environment</em></span> <span><em>2021</em></span>
                        </div>
                        <div class={styles["item-description"]}>
                            <ul>
                                <li>I designed a resource allocation technique and algorithm for serving requests generated by IoT devices in a Fog/Edge Computing environment.</li>
                                <li>Then, I implemented and validated the technique in a simulation environment called IFogSim.</li>
                                <li>The algorithm is based on Gale-Shapley Matching algorithm, which I exploited and adapted to deploy requested services on heterogeneous Fog Nodes.</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class={styles["item-title"]}>
                            <span><b>Used car price estimator</b></span> <span><em>2020</em></span>
                        </div>
                        <div class={styles["item-description"]}>
                            <ul>
                                <li>I scraped used cars sales data from a well-known Algerian retail website (ouedkniss.com).</li>
                                <li>After some data cleaning and preparation, and exploratory data analysis, I trained a Machine Learning model to predict the price of a used car.</li>
                                <li>Finally, I created a REST API that utilizes this model using Flask and Docker, and a mock-up web application that uses the API (Source code is available on my Github).</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </section>
            <section>
                <h2>Scholarships</h2>
                <hr/>
                <ul>
                    <li>
                        <div class={styles["item-title"]}>
                            <span>Eiffel Excellence scholarship</span> <span>2022</span>
                        </div>
                        <div class={styles["item-description"]}>
                            For the Artificial Intelligence Master of the University of Paris-Saclay.
                        </div>
                    </li>
                </ul>
            </section>
        </main>
    );
}

export default Curriculum;
