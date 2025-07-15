fetch("story.json")
  .then((response) => response.json())
  .then((data) => {
    const story = data.story;
		const tree = data.tree;

		const gameDiv = document.getElementById("game");
		const storyDiv = document.getElementById("story");
		const choicesDiv = document.getElementById("choices");

		let currentParagraph = 0;

		const makeButtons = () => {
			choicesDiv.innerHTML = "";

			if ((!story[currentParagraph].options || story[currentParagraph].options.length < 2) && tree[currentParagraph].length === 1) {
				const nextButton = document.createElement("button");
				nextButton.innerText = "DALEJ";
				nextButton.addEventListener("click", () => {
					currentParagraph = tree[currentParagraph][0];
					updateStory();
				});
				choicesDiv.appendChild(nextButton);
				return;
			}

			if (!story[currentParagraph].options || tree[currentParagraph].length === 0) {
				const endButton = document.createElement("button");
				endButton.innerText = "KONIEC GRY";
				endButton.addEventListener("click", () => {
					gameDiv.innerHTML = "<pre id='story'>DZIĘKI ZA GRĘ!\nOdśwież stronę, by zagrać jeszcze raz ;)\n~ <a href='https://github.com/HexHyperion'>Szymon</a></pre>";
				});
				choicesDiv.appendChild(endButton);
				return;
			}

			story[currentParagraph].options.forEach((option, index) => {
				const button = document.createElement("button");
				button.innerText = option;
				button.addEventListener("click", () => {
					currentParagraph = tree[currentParagraph][index];
					updateStory();
				});
				choicesDiv.appendChild(button);
			});
		}

		const updateStory = () => {
			if (storyDiv.innerText.trim() !== "") {
				const oldSpan = document.createElement("span");
				oldSpan.className = "old-story";
				oldSpan.innerText = storyDiv.innerText;
				storyDiv.innerHTML = "";
				storyDiv.appendChild(oldSpan);
			}
			else {
				storyDiv.innerHTML = "";
			}

			const newText = document.createElement("span");
			newText.innerText = `\n${story[currentParagraph].description}`;
			storyDiv.appendChild(newText);

			makeButtons();
			storyDiv.scrollTop = storyDiv.scrollHeight;
		}

		storyDiv.innerText = story[currentParagraph].description;
		storyDiv.scrollTop = storyDiv.scrollHeight;

		makeButtons();
  })
  .catch((error) => {
    console.error("Error fetching story:", error);
  });