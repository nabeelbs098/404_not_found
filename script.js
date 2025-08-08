// Simple Novel Reader Script
const chapters = [
    "Chapter 1: The first glance was like a spark in the night...",
    "Chapter 2: A letter arrived, carrying words warmer than the sun...",
    "Chapter 3: Their walks by the river became a daily ritual...",
    "Chapter 4: An unexpected rain, a shared umbrella...",
    "Chapter 5: A secret revealed beneath the cherry blossoms...",
    "Chapter 6: Laughter in the quiet of the library...",
    "Chapter 7: A heartfelt confession under the stars...",
    "Chapter 8: A misunderstanding that shook their hearts...",
    "Chapter 9: The reunion, more beautiful than they dreamed..."
];

let currentChapter = 0;

const chapterText = document.getElementById("chapter-text");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Display the first chapter
chapterText.innerText = chapters[currentChapter];

// Next chapter
nextBtn.addEventListener("click", () => {
    if (currentChapter < chapters.length - 1) {
        currentChapter++;
        chapterText.innerText = chapters[currentChapter];
    }
});

// Previous chapter
prevBtn.addEventListener("click", () => {
    if (currentChapter > 0) {
        currentChapter--;
        chapterText.innerText = chapters[currentChapter];
    }
});
