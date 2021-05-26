const _this = $;
const DELAY = 800;

const clickFirstElement = () => {
  if (_this("article").innerText.includes("You Retweeted")) {
    if (!_this('article div[data-testid="unretweet"]')) {
      _this("article").remove();
      console.log("removed elem");
      setTimeout(() => {
        clickFirstElement();
      }, DELAY);
      return
    }
    
    _this('article div[data-testid="unretweet"]').click();
    setTimeout(() => {
      unretweet();
    }, DELAY);
  } else if (_this('article [aria-label="View Tweet activity"]')) {
    _this('div[data-testid="caret"]').click();
    setTimeout(() => {
      deleteElement();
    }, DELAY);
  }
};

const unretweet = () => { 
  _this('div[data-testid="unretweetConfirm"]').click();
  setTimeout(() => {
    clickFirstElement();
  }, DELAY);
  console.log("unretweeted");
};

const deleteElement = () => {
  if (_this('div[role="menuitem"]').innerText !== "Delete") {
    _this('div[data-testid="caret"]').click();
    _this("article").remove();
    setTimeout(() => {
      clickFirstElement();
    }, DELAY);
    console.log("removed elem");
    return;
  }

  _this('div[role="menuitem"]').click();
  setTimeout(() => {
    confirmDelete();
  }, DELAY);
};

const confirmDelete = () => {
  _this('div[data-testid="confirmationSheetConfirm"]').click();
  setTimeout(() => {
    window.scrollBy(0, 50);
    clickFirstElement();
  }, DELAY);
  console.log("deleted tweet");
};

function getTimestamp() {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function runner(action, actionName) {
  setTimeout(() => {
    action();
    console.info(getTimestamp(), actionName);
  }, DELAY);
}

clickFirstElement();
