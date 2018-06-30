# Ofek Gila's Official Blog


### How to get started editing (for Ubuntu/Linut Mint)

#### Step 1: Install dependencies

1. Jekyll, Ruby/Ruby-dev

	```bash
	sudo apt install jekyll
	sudo apt-get install ruby-dev
	```


#### Step 2: Setup repository

1. Clone the repository from [here][repo url], e.g.:

	```bash
	git clone https://github.com/The-Ofek-Foundation/blog.git
	```

#### Step 3: Install ruby dependencies from Gemfile

1. Install ruby dependencies using bundler

	```bash
	sudo apt install ruby-bundler
	# from inside parent blog directory:
	bundle install
	```

#### And that's it!

Start running with:

```bash
jekyll serve
```


And view the website live [here](http://127.0.0.1:4000/) or [here](http://localhost:4000/)!



[repo url]:https://github.com/The-Ofek-Foundation/blog "github repository"
