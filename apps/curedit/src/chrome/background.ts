chrome.commands.onCommand.addListener((command: string) => {
  if (command === 'toggle-recording') {
    console.log('TCL: toggle command', command);
  } else if (command === 'next-tabs') {
    console.log('TCL: next command', command);
  } else if (command === 'prev-tabs') {
    console.log('TCL: prev command', command);
  }
});

chrome.bookmarks.getTree((results: chrome.bookmarks.BookmarkTreeNode[]) => {
  console.log('bookmark tree node: ', results);
});
