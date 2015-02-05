// $.AutoSearch = function (el) {
//   this.$el = $(el);
//   this.$input = this.$el.find("input[name=query]");
//   this.$ul = this.$el.find("ul.names");
//
//   this.$input.on("input", this.render.bind(this));
//   this.render();
// };
//
// $.AutoSearch.prototype.searchResults = function () {
//   return NameApp.Name.search(this.$input.val());
// };
//
// $.AutoSearch.prototype.render = function () {
//   this.$ul.empty();
//
//   this.searchResults().forEach((function (name) {
//     var $li = $("<li>");
//     $li.text(name.fullName());
//     this.$ul.append($li);
//   }).bind(this));
// };
//
// $.fn.autoSearch = function () {
//   return this.each(function () {
//     new $.AutoSearch(this);
//   });
// }
//
// $(function () {
//   $('.auto-search').autoSearch();
// });
//
// (function () {
//   if (typeof NameApp === "undefined") {
//     window.NameApp = {};
//   }
//
//   var Name = NameApp.Name = function (attrs) {
//     this.fname = attrs.fname;
//     this.lname = attrs.lname;
//   };
//
//   Name.all = [
//     new Name({ fname: "Curie", lname: "Ruggeri" }),
//     new Name({ fname: "Markov", lname: "Ruggeri" }),
//     new Name({ fname: "Breakfast", lname: "Watts-Rubens" }),
//     new Name({ fname: "Earl", lname: "Watts-Rubens" }),
//   ];
//
//   Name.search = function (searchQuery) {
//     searchQuery = searchQuery.toLowerCase();
//
//     var results = []
//     Name.all.forEach(function (name) {
//       var fullName = name.fullName().toLowerCase();
//       if (fullName.match(searchQuery)) {
//         results.push(name);
//       }
//     });
//
//     return results;
//   };
//
//   Name.prototype.fullName = function () {
//     return [this.fname, this.lname].join(" ");
//   };
// })();
