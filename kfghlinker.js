// ==UserScript==
// @name         KFGHLinker
// @namespace    https://github.com/imkmf/kfghlinker
// @version      0.1
// @description  Better link introspection on GitHub
// @author       Kristian Freeman <kristian@kristianfreeman.com>
// @include      *github*
// @grant        none
// ==/UserScript==

var KFGHLinker = function() {}

KFGHLinker.prototype.run = function() {
  var links = document.querySelectorAll(".discussion-timeline .timeline-comment-wrapper a");

  for (var i = 0; i < links.length; ++i) {
    this.processLink(links[i]);
  }
};

KFGHLinker.prototype.isIssue = function(link) {
  return !!link.href.match(/\/issues\/\d*/)
};

KFGHLinker.prototype.isPull = function(link) {
  return !!link.href.match(/\/pull\/\d*/)
};

KFGHLinker.prototype.buildSpanElement = function(class_for_type) {
  var span = document.createElement('span');
  span.classList.add("kfghlinker");
  span.classList.add("octicon");
  span.classList.add(class_for_type);
  span.style.paddingLeft = "5px"
  return span;
};

KFGHLinker.prototype.buildIssueElement = function() {
  return this.buildSpanElement("octicon-issue-opened")
};

KFGHLinker.prototype.buildPRElement = function() {
  return this.buildSpanElement("octicon-git-pull-request")
};

KFGHLinker.prototype.processLink = function(link) {
  // Cut out page actions (edit, permalink, etc)
  if (link.href.indexOf("#") > -1) {
    return false;
  }

  if (this.isIssue(link)) {
    link.parentNode.insertBefore(this.buildIssueElement(), link.nextSibling);
  } else if (this.isPull(link)) {
    link.parentNode.insertBefore(this.buildPRElement(), link.nextSibling);
  }
}

var linker = new KFGHLinker;
window.onload = linker.run();
