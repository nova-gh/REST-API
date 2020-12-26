const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
let port = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(express.static("public"));

//==Mongoose Connection

mongoose.connect(
	"mongodb+srv://admin:admin413@cluster0.hgnmf.mongodb.net/wikiDB",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);
//article schema
const articleSchema = {
	title: String,
	content: String,
};
//article model
const Article = mongoose.model("Article", articleSchema);

//get route
app.get("/articles", (req, res) => {
	Article.find((err, foundArticles) => {
		if (!err) {
			res.send(foundArticles);
			// console.log(foundArticles);
			// res.send("Successfully found articles");
		} else {
			res.send(err);
		}
	});
});
app.post("/articles", (req, res) => {
	//grabbing data
	// console.log(req.body.title);
	// console.log(req.body.content);
	const newArticle = new Article({
		title: req.body.title,
		content: req.body.content,
	});
	newArticle.save((err) => {
		if (!err) {
			res.send("Articles saved to DB");
		} else {
			res.send(err);
		}
	});
});
//delete http
app.delete("/articles", (req, res) => {
	Article.deleteMany((err) => {
		if (!err) {
			res.send("All articles deleted from DB");
		} else {
			res.send(err);
		}
	});
});
app.listen(port, () => {
	console.log(`Server is up! Local Port: ${port}!`);
});
