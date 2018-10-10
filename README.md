# reaktor-challenge

## Usage

As requested, I minimize the use of this code is a web UI developed with Reactor, using the minimum of dependencies. Basically the code is pure JSX, HTMl, CSS and pure JS.

The application run with a small server provided, just run `node server.js` and check localhost:9000/index.html. It only serves static files, specifically the JSX, JS and CSS files requested by the index.html. The server is required only because the use of JSX. I started developing without it, but the code got too complex. Since the browser does not understand, I added [babel](https://babeljs.io) for the translation to JS. I considered that this dependency wasn't taking important part of the assignment.

About, the UI itself. I had a lot of questions, that for the terms of the challenge, I had to resolve on my own. Things like *Why somebody want to display this data?*, *What would you do with this information?*. I have to choose something, so I remembered my few interactions with DPKG in the past, that were basically to install a package outside the package manager (apt) or check if the packaged, if installed.

With the last answer, I focused in implement a package search, since it's to much data to see in a browser. You can write, the app will match and display. Then, viewing the dependencies, who depends on a package and the packages depending on it, if you select one, you will go to it. And on it, you will have a link to go back, like a browser history.

I know that show all the packages was part of the requirements, but I choose the search bar for UI simplicity and accessibility. The are too many items to be displayed, that you'll probably need to use the browser's find in order to get what you are looking for.

### Conclusion

I didn't have use React seriously before, so it was a good challenge. And since I limit myself to not use external dependencies, I liked to write a small server and app with the minimum requirements to do a React App. Today it's too easy to rely in other tools, sometimes adding too much unnecessary code to a prototype.

## The challenge

Original description:

> On a Debian or an Ubuntu system, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Here’s a sample file (you can use this as input for the program we’ll describe): https://gist.github.com/lauripiispanen/29735158335170c27297422a22b48caa
>
> We’d like you to write a program that exposes some key information about currently installed packages via a UI in the browser. You can choose any language you like for the program, but we’d like you to build the UI using React.
>
> The program should provide the following features:
> - An index that lists the installed packages.
> - From the list of installed packages, you should be able to access more information about each package. That information should include:
>    - Name
>    - Description
>    - The names of the other packages this package depends on (skip version numbers)
>    - The names of the other packages that depend on this package
>    - You should be able to access this same information for each of these dependencies and reverse dependencies, too.
>
> Some other things to keep in mind:
> - Try to minimize the use of external dependencies. Of course we don’t want you to write your own web server or frontend framework or anything like that, but on the other hand, if your whole solution is just a composition of other libraries, that defeats the spirit of the exercise. Use your common sense when evaluating dependencies, but err toward minimalism.
> - Similarly, the goal of the assignment is to see how you solve this problem with a programming language, not how well you use package managers.
> - To keep things simple, just look at the “Depends” field. You can ignore other fields that work similarly, such as “Suggests” and “Recommends”.
> - Sometimes there are alternates in a dependency list, separated by the pipe character (\|). When rendering such dependencies, you don’t need to make more information available for any package that isn’t present in the status file. For alternatives that aren’t present in the status file, it’s sufficient to show just their name.
> - The Debian Policy Manual has a section entitled “Syntax of control files”. The input data conforms to that syntax.
>
> Try to write code as you usually would—the only extra constraint we’re imposing is that you use React for the UI. When reviewing your code, we’ll focus on maintainability and how well it communicates its intent.

## My process

First of all, I like to summarize what and how.

### What

Show a more current and constrained idea of how you think about writing code to solve problems.

### How

Web UI built with React that exposes information about the current packages installed in a Debian-like SO from the DPKG status file.

#### Guidelines
- Minimize the use of external dependencies.
- Use common sense when evaluating dependencies, but err toward minimalism.
- Focus on how you solve this problem with a programming language, not how well you use package managers.
- To keep things simple, just look at the *Depends* field. You can ignore other fields that work similarly, such as *Suggests* and *Recommends*.
- Sometimes there are alternates in a dependency list, separated by the pipe character `|`. When rendering such dependencies, you don’t need to make more information available for any package that isn’t present in the status file. For alternatives that aren’t present in the status file, it’s sufficient to show just their name.
- The *Debian Policy Manual* has a section entitled [Syntax of control files](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-controlsyntax). The input data conforms to that syntax.

### First approach

I consider a good opening step to confirm that I have access to the DPKG information and display the information with the smallest configuration possible minimizing interactions, configurations, and files. In this case, I want to check if a simple HTML loading React from a script tag could display the DPKG data provided in the challenge.

A small HTML/JS does the work, check [index.html](https://github.com/afaundez/reaktor-challenge/blob/16ef80fbac705f34a3aa41605b2360c1dee77cdf/index.html).

#### 1st iteration

Now, I would parse the data, since it's a huge text file. Since the file is going to grow, it's time to separate the KS from the HTML. At the end at this step I would like to have a clear semantic tree.

Making a semantic version, brings a few concern:
- The documentations mention the data in the file as ControlData, composed by one or more paragraphs (packages) and each paragraph containing multiple data fields, each one formed by a field name and a field value. An annoying issue with this is that package is a reserved word in Javascript, no for the moment I leave it a paragraph.
- The more complicated the data structures, the messier the React elements and the javascript file.

The dependency packages links are simple anchors pointing paragraphs id, they jump to the heading with the id marked. It helps to navigate, but usually you get stuck there.

At this point, the main part is at [scripts.js](scripts.js).

### Next approach: better access

Display all the packages doesn't make sense, too much information, even if we split by Section. My approaches to dpkg in the past have involved search packages, usually involving listing and grep values. I would like to have the ability to search.

It would be nice from now on, be able to use JSX to define the React UI, so I will try to get babel working in browser mode.

It works on the browser, but it the JS file needs to be served, so I added a small node server for JS and HTML files.

Refactoring the code to JSX syntax and splitting it into more files, the code got cleaner. It's time to add a search bar.

The search bar is a new React component, and show suggestions based on the packages name.

### Next Step: Style

It's moment to add a little bit of style to appreciate the data in a better way.

### Next Step: Interaction

Since interaction is only between packages in the control file, I'm going to implement a browsing history, adding a back button every time a package is accessed from another package.

### Next: Clean up

The file are grown a bit, so I'll start splitting files, and reviewing coding style. I will document also how to use.
