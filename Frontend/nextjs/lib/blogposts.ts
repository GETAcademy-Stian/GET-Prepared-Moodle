import fs from "fs";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import { remark } from "remark";
import html from "remark-html";
import type { BlogPost } from "@/types";
import { title } from "process";

const dateFormat = "DD-MM-YYYY";
const blogPostDirectory = path.join(process.cwd(), "blogposts"); //cwd = current working directory

const getSortedBlogPosts = (): BlogPost[] => {
	const fileNames = fs.readdirSync(blogPostDirectory);
	const blogPosts = fileNames.map((f) => {
		const id = f.replace(/\.md$/, ""); //fjerner .md
		const blogPath = path.join(blogPostDirectory, f);
		const blogContent = fs.readFileSync(blogPath, "utf-8");
		const result = matter(blogContent);

		return {
			id,
			title: result.data.title,
			date: result.data.date,
			category: result.data.category,
		};
	});

	return blogPosts.sort((a, b) => {
		const dateOne = moment(a.date, dateFormat);
		const dateTwo = moment(b.date, dateFormat);
		if (dateOne.isBefore(dateTwo)) return -1;
		else if (dateTwo.isAfter(dateOne)) return 1;
		else return 0;
	});
};

export const categorizeBlogPosts = (): Record<string, BlogPost[]> => {
	const sortedBlogPosts = getSortedBlogPosts();
	const categorisedBlogPosts: Record<string, BlogPost[]> = {};

	sortedBlogPosts.forEach((p) => {
		if (!categorisedBlogPosts[p.category]) categorisedBlogPosts[p.category] = [];
		categorisedBlogPosts[p.category].push(p);
	});

	return categorisedBlogPosts;
};

export const blogPostData = async (id: string) => {
	const blogPath = path.join(blogPostDirectory, `${id}.md`);
	const blogContent = fs.readFileSync(blogPath, "utf-8");
	const result = matter(blogContent);
	const readContent = await remark().use(html).process(result.content);
	const contentAsHtml = readContent.toString();

	return {
		id,
		contentAsHtml,
		title: result.data.title,
		category: result.data.category,
		date: moment(result.data.date, dateFormat).format("MMMM Do YYYY"),
	};
};
