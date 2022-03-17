/**
Code Taker NG+
Student: Alex Lorrain
Teacher: Pippin Barr
*/

"use strict";

let cthulhuGif;

function preload() {
  cthulhuGif = createImg("assets/gif/cthulhu_cute.gif");
}

let secret_hp = `hp`;
let secret_love = `love`;
let secret_craft = `craft`;

$(`#solved-dialog`).dialog({
  autoOpen: false,

  minWidth: 675,
  minHeight: 630,

  buttons: {
    "Oh Sh...": function () {
      $(this).effect("explode", 500);
      $(this).dialog(`close`);
    },
  },
});

$(`.secret`).on(`mouseover`, function (event) {
  $(this).addClass(`found`, 300);
});

$(`.secret`).draggable({
  helper: `clone`,
});

$(`#hp`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`, 300);
    ui.draggable.off(`mouseover`);
    if (
      $(`#hp`).text() === secret_hp &&
      $(`#love`).text() === secret_love &&
      $(`#craft`).text() === secret_craft
    ) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});

$(`#love`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`, 300);
    ui.draggable.off(`mouseover`);
    if (
      $(`#hp`).text() === secret_hp &&
      $(`#love`).text() === secret_love &&
      $(`#craft`).text() === secret_craft
    ) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});

$(`#craft`).droppable({
  drop: function (event, ui) {
    let letter = ui.draggable.text();
    $(this).append(letter);
    ui.draggable.draggable(`disable`);
    ui.draggable.removeClass(`found`, 300);
    ui.draggable.off(`mouseover`);
  if (
      $(`#hp`).text() === secret_hp &&
      $(`#love`).text() === secret_love &&
      $(`#craft`).text() === secret_craft
    ) {
      $(`#solved-dialog`).dialog(`open`);
    }
  },
});
