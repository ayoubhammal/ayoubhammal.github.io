import json
import pathlib
import logging
import shutil

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(logging.Formatter("%(asctime)s [%(levelname)s] %(message)s"))
logger.addHandler(stream_handler)

OUTPUT_PATH = pathlib.Path("./dist/")
SOURCE_PATH = pathlib.Path("./src")
RESOURCE_PATH = pathlib.Path("./resources")
PLAN_FILENAME = "plan.json"
BLOG_SUBPATH = pathlib.Path("blog")
BLOG_DIR_PATH = OUTPUT_PATH / BLOG_SUBPATH

def main() -> None:
    if OUTPUT_PATH.exists():
        logger.warning(f"Output path `{str(OUTPUT_PATH)}` exists already. Removing it.")
        shutil.rmtree(OUTPUT_PATH)
    assert SOURCE_PATH.is_dir(), f"Source path `{str(SOURCE_PATH)}` does not exists."
    assert RESOURCE_PATH.is_dir(), f"Resource path `{str(RESOURCE_PATH)}` does not exists."

    logger.info(f"Creating {str(OUTPUT_PATH)}.")
    OUTPUT_PATH.mkdir(parents=True, exist_ok=False)

	# reading and parsing the website plan json
    plan_path = SOURCE_PATH / PLAN_FILENAME
    logger.info(f"Parsing plan.")
    with open(plan_path, "r") as plan_file:
        plan_dict = json.load(plan_file)
    logger.info(f"Plan:\n{json.dumps(plan_dict, indent=2)}")

    # reading the header
    header_path = SOURCE_PATH / plan_dict["header"]["path"]
    logger.info(f"Loading heaer.")
    with open(header_path, "r") as header_file:
        header = header_file.read()
    # reading the footer
    footer_path = SOURCE_PATH / plan_dict["footer"]["path"]
    logger.info(f"Loading footer.")
    with open(footer_path, "r") as footer_file:
        footer = footer_file.read()
    # reading the template
    template_path = SOURCE_PATH / plan_dict["pageTemplate"]["path"]
    logger.info(f"Loading page template.")
    with open(template_path, "r") as template_file:
        template = template_file.read()

    for page_dict in plan_dict["pages"]:
        logger.info("{} @ {}".format(page_dict["title"], page_dict["path"]))
        logger.info("Loading page.")
        page_path = SOURCE_PATH / page_dict["path"]
        with open(page_path, "r") as page_main_file:
            page_main = page_main_file.read()

        logger.info("Applying template.")
        page_body = header + page_main + footer
        page_full = template.format(title=page_dict["title"], body=page_body)

        logger.info("Writing full page.")
        page_output_path = OUTPUT_PATH / page_dict["path"]
        with open(page_output_path, "w") as page_output_file:
            page_output_file.write(page_full)

    blog_index_path = SOURCE_PATH / plan_dict["blog"]["index"]["path"]
    with open(blog_index_path, "r") as blog_index_file:
        blog_index_main = blog_index_file.read()
    blog_entry_path = SOURCE_PATH / plan_dict["blog"]["entry"]["path"]
    with open(blog_entry_path, "r") as blog_entry_file:
        blog_entry = blog_entry_file.read()

    BLOG_DIR_PATH.mkdir()
    blog_index_content = ""
    for blog_page_dict in plan_dict["blog"]["pages"]:
        logger.info("{} @ {}".format(blog_page_dict["title"], blog_page_dict["path"]))

        blog_page_path = SOURCE_PATH / blog_page_dict["path"]
        with open(blog_page_path, "r") as blog_page_main_file:
            blog_page_main = blog_page_main_file.read()

        logger.info("Applying template.")
        blog_page_body = header + blog_page_main + footer
        blog_page_full = template.format(title=blog_page_dict["title"], body=blog_page_body)

        logger.info("Writing full page.")
        blog_page_output_path = OUTPUT_PATH / blog_page_dict["path"]
        with open(blog_page_output_path, "w") as blog_page_output_file:
            blog_page_output_file.write(blog_page_full)
        
        blog_index_content += blog_entry.format(**blog_page_dict)

    logger.info("Blog index content:\n" + blog_index_content)

    blog_index_main = blog_index_main.format(content=blog_index_content)
    blog_index_body = header + blog_index_main + footer
    blog_index_full = template.format(title=plan_dict["blog"]["index"]["title"], body=blog_index_body)

    logger.info("Writing full blog index.")
    blog_index_output_path = OUTPUT_PATH / plan_dict["blog"]["index"]["path"]
    with open(blog_index_output_path, "w") as blog_index_output_file:
        blog_index_output_file.write(blog_index_full)


if __name__ == "__main__":
    main()
