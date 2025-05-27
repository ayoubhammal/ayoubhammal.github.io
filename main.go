/**
* Stattic website generator for my own personal web page.
* # Website Structure
* - Top level pages: home, resume, contact, events etc..
* - Blog index page
* - Blog pages
*
* # File Structure
* - Assets
* - Header and footer html blobs
* - Top level pages' content
* - Blog pages' content
* - Blog index layout and entry template - HOW?
* - Website structure json descriptor
 */

package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"io"
	"log"
	"os"
	"path"
	"text/template"
)

type Fragment struct {
	Path string `json:"path"`
}

type BlogPage struct {
	Path string `json:"path"`
	ImgPath string `json:"imgPath"`
	Title string `json:"title"`
	Date string `json:"date"`
	Description string `json:"description"`
}

type Page struct {
	Path string `json:"path"`
	Title string `json:"title"`
}

type Blog struct {
	Index Page `json:"index"`
	Entry Fragment `json:"entry"`
	Pages []BlogPage `json:"pages"`
}

type Plan struct {
	PageTemplate Fragment `json:"pageTemplate"`
	Header Fragment `json:"header"`
	Footer Fragment `json:"footer"`
	Pages []Page `json:"pages"`
	Blog Blog `json:"blog"`
}

type TemplateData struct {
	Title string
	Body string
}
type BlogIndexTemplateData struct {
	Content string
}

func AttachHeaderFooter(page string, header string, footer string) (string, error) {
	return header + page + footer, nil
}

func ReadFileToString(path string) (string, error) {
	file, err := os.Open(path)
	if err != nil {
		return "", err
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}
	return string(content), nil
}

func main() {
	// flag parsing
	var srcPath = flag.String("path", "", "path to the source of the website")
	flag.Parse()
	var outputPath string = "dist/"
	if err := os.RemoveAll(outputPath); err != nil {
		log.Fatal(err)
	}
	if err := os.Mkdir(outputPath, os.ModePerm); err != nil {
		log.Fatal(err)
	}
	var resourcesPath string = "resources/"
	err := CopyDir(resourcesPath, outputPath + "resources/")
	if err != nil {
		log.Fatal(err)
	}

	// reading the website plan
	planJsonString, err := ReadFileToString(path.Join(*srcPath, "plan.json"))
	if err != nil {
		log.Fatal(err)
	}
	log.Println(string(planJsonString))

	// parsing the website plan json
	var plan Plan
	if err := json.Unmarshal([]byte(planJsonString), &plan); err != nil {
		log.Fatal(err)
	}
	log.Printf("%v\n", plan)

	// reading the header
	header, err := ReadFileToString(path.Join(*srcPath, plan.Header.Path))
	if err != nil {
		log.Fatal(err)
	}
	// reading the footer
	footer, err := ReadFileToString(path.Join(*srcPath, plan.Footer.Path))
	if err != nil {
		log.Fatal(err)
	}
	// reading the template
	pageTemplate, err := template.ParseFiles(path.Join(*srcPath, plan.PageTemplate.Path))
	if err != nil {
		log.Fatal(err)
	}

	// attaching the header/footer to the top-level pages
	for _, page := range plan.Pages {
		pagePath := page.Path
		pageTitle := page.Title
		log.Printf("%s @ %s\n", pageTitle, pagePath)

		pageMain, err := ReadFileToString(path.Join(*srcPath, pagePath))
		if err != nil {
			log.Fatal(err)
		}

		fullPage, err := AttachHeaderFooter(pageMain, header, footer)
		if err != nil {
			log.Fatal(err)
		}

		pageFile, err := os.OpenFile(path.Join(outputPath, pagePath), os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Fatal(err)
		}

		err = pageTemplate.Execute(pageFile, TemplateData{pageTitle, fullPage})
		if err != nil {
			log.Fatal(err)
		}
		pageFile.Close()
	}

	// attaching the header/footer to the blog index
	blogIndexMain, err := template.ParseFiles(path.Join(*srcPath, plan.Blog.Index.Path))
	if err != nil {
		log.Fatal(err)
	}

	blogEntry, err := template.ParseFiles(path.Join(*srcPath, plan.Blog.Entry.Path))
	if err != nil {
		log.Fatal(err)
	}

	// create blog directory
	if err := os.Mkdir(path.Join(outputPath, "blog"), os.ModePerm); err != nil {
		log.Fatal(err)
	}

	blogIndexContent := bytes.NewBufferString("")
	for _, page := range plan.Blog.Pages {
		pagePath := page.Path
		pageTitle := page.Title
		log.Printf("%s @ %s\n", pageTitle, pagePath)

		pageMain, err := ReadFileToString(path.Join(*srcPath, pagePath))
		if err != nil {
			log.Fatal(err)
		}

		fullPage, err := AttachHeaderFooter(pageMain, header, footer)
		if err != nil {
			log.Fatal(err)
		}

		pageFile, err := os.OpenFile(path.Join(outputPath, pagePath), os.O_CREATE|os.O_WRONLY, 0644)
		if err != nil {
			log.Fatal(err)
		}

		err = pageTemplate.Execute(pageFile, TemplateData{pageTitle, fullPage})
		if err != nil {
			log.Fatal(err)
		}
		pageFile.Close()

		// create entry
		err = blogEntry.Execute(blogIndexContent, page)
		if err != nil {
			log.Fatal(err)
		}
	}
	log.Println(blogIndexContent.String())

	blogIndex := bytes.NewBufferString("")

	err = blogIndexMain.Execute(blogIndex, BlogIndexTemplateData{blogIndexContent.String()})
	if err != nil {
		log.Fatal(err)
	}

	fullBlogIndexPage, err := AttachHeaderFooter(blogIndex.String(), header, footer)
	if err != nil {
		log.Fatal(err)
	}

	pageFile, err := os.OpenFile(path.Join(outputPath, plan.Blog.Index.Path), os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal(err)
	}

	err = pageTemplate.Execute(pageFile, TemplateData{plan.Blog.Index.Title, fullBlogIndexPage})
	if err != nil {
		log.Fatal(err)
	}
	pageFile.Close()
}
