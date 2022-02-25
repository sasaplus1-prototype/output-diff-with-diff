import * as diff from 'diff';

function main() {
  const oldText = document.getElementById('js-old');
  const newText = document.getElementById('js-new');
  const result = document.getElementById('js-result');

  if (!oldText || !newText || !result) {
    return;
  }

  oldText.value = 'aaa\nbbb\nbbb\nddd\neee';
  newText.value = 'aaa\nccc\nbbb\nddd\nqqqqqq';

  /*
  function apply() {
    const patch = diff.structuredPatch(
      'old.txt',
      'new.txt',
      oldText.value,
      newText.value,
      'old',
      'new'
    );

    console.log(patch);

    result.innerHTML = '';

    const patches = [];

    for (const hunk of patch.hunks) {
      console.log(hunk);

      for (const line of hunk.lines) {
        patches.push(
          line.startsWith('+')
            ? `<p class="a">${line}</p>`
            : line.startsWith('-')
            ? `<p class="d">${line}</p>`
            : `<p>${line}</p>`
        );
      }
    }

    result.innerHTML = patches.join('');
  }
  */

  function apply() {
    const patch = diff.createPatch(
      'file.txt',
      oldText.value,
      newText.value,
      'old',
      'new'
    );

    console.log(patch);

    result.innerHTML = '';

    const patches = [];

    for (const line of patch.split('\n')) {
      patches.push(
        line.startsWith('+')
          ? `<p class="a">${line}</p>`
          : line.startsWith('-')
          ? `<p class="d">${line}</p>`
          : `<p>${line}</p>`
      );
    }

    result.innerHTML = patches.join('');
  }

  oldText.addEventListener('input', apply, false);
  newText.addEventListener('input', apply, false);

  apply();
}

main();
