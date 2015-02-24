# Geometrhythm

## Summary

Geometrhythm is a network for exploring musical rhythms.

The highlight of Geometrhythm is the data visualizations of rhythmic complexity measurements which dynamically update as you modify the rhythm. It was a blast to show off my CS/math/algorithm skills creating these measurements, as well as testing the limits of my front-end skills to build responsive, attractive, expressive charts.

I am already getting a ton of utility out of Geometrhythm myself as a composer. Building beautiful and functional tools like this is why I got into writing code.

Users can:

<b>Design rhythms</b>
- [x] Use a visual tool to create a rhythm
- [x] Listen to the rhythm while modifying it
- [x] Name the rhythm and save it

<b>Discover rhythms</b>
- [x] Sign up, log in
- [x] Analyze rhythms with dynamic data visualizations of complexity measurements
- [x] Browse a collection of 3000+ algorithmically generated quality rhythms

<b>Discuss rhythms</b>
- [x] Like a rhythm
- [x] Comment on a rhythm or other comments
- [x] See play counts of rhythms

Geometrhythm might seem like a subset of Soundcloud, being only for rhythms. But not exactly! The set of possible rhythms is many orders of magnitude smaller than the set of possible audio waveforms, so in that sense Geomerhythm is maybe more like a cross between Soundcloud and the OEIS.

## Guide to the code

Geometrhythm uses these core technologies:
- Backbone.js
- Ruby on Rails
- jQuery

User authentication is handled through Rails, while the rhythmic analyses, information displays, and index are Backbone views within views within views, making extensive use of listeners.

The algorithms behind the seeding of the database with 3000+ quality rhythms are written in Ruby, as are the algorithms behind the complexity measurements rendered in my data visualizations. The soon-to-come search algorithms will also be built in Ruby.

The central "rhythm ring" widget is powered by a combination of:
- HTML5 Canvas
- CSS transitions
- jQuery UI

Building Geometrhythm has been exhilarating from start to finish, but building the rhythm ring may have been my favorite part.

I chose CSS transitions to achieve the animation of the rhythmic cells - stretching, squeezing, and switching as the user mutates the rhythm - because they are lightweight and the Bézier curves used in the timing functions make for attractive motion easing effects; I used a spiffy trick where I set the transform origin of the cells to the center of the ring, so that all I need to do is change their rotation to cause orbiting.

Unfortunately, however, jQuery UI's draggable and droppable functionality does not play well with CSS transitions; upon start of a drag, transitions are re-applied, resulting in dragging the object not under your cursor, but floating out somewhere to the side. I considered coding my own version of draggable and droppable from scratch, but ultimately decided to trust the craftsmanship of jQuery UI and find a means to incorporate it despite this obstacle. So, the cells you interact with on Geometrhythm are actually hybrids: visible cells animated using CSS transitions, and zero-opacity "handle" cells which take their place whenever the user initiates a drag-and-drop. The CSS cells are placed using angles, while the jQuery handle cells are placed by absolute coordinates.

Finally, the polygon that appears in the center of the ring, connecting the onsets of the rhythm, was a perfect job for HTML5 Canvas. It overlays on top of the CSS+jQuery elements, and draws lines that keep up with the rhythm whenever it's animating, by tracking coordinates of the CSS cells.

## Original Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Records

### Phase 1: Splash (~2 days)

Having an account is not necessary to get started with Geometrhythm: the splash page is ready to go with a rhythm to play, and an interactive, animated tool you can use to play around with it.

[Details][phase-one]

### Phase 2: Accounts & Show (~2 days)

When the current rhythm already exists in the database, a teasingly small amount of info about it is displayed out to the side. When the rhythm hasn't been "discovered" yet, it is possible to claim it. This is the hook that will make users want to join.

Once logged in, the page will show the rhythm's full set of names, its creator, likers, comments, and play count. You will be able to like the rhythm, tag it, or comment on it.

[Details][phase-two]

### Phase 3: List (~2 days)

The index view is dominated by a paginated collection of rhythms, and its right-hand sidebar allows filtering by creator, liker, or tag. Visiting the index from different contexts pre-sets these filters, making it multipurpose.

[Details][phase-three]

### Phase 4: Polish (~1 day)

Because the user can return to the splash/root page to create and save new rhythms, at this point the core functionality of Geometrhythm is complete. Of most importance will be making sure what I've got is responsive and refined.

[Details][phase-four]

### Phase 5: Stretch Goals

My most important stretch goal is to be able to turn on edit mode for a rhythm from the show page, so that as the rhythm changed the surrounding subviews would update to reflect. That is, if I switched a couple beats around and the new rhythm was already in the database, its info would show; or if it was a new rhythm, I'd be able to name it right away.

Further stretch goals:

<b>Design rhythms</b>
- [ ] Onboarding, tool tips
- [ ] Upload your own percussion sample to use for playback
- [ ] Download rhythms as MIDI

<b>Discover rhythms</b>
- [ ] Find rhythms related by shared geometric properties
- [ ] Find rhythms based on popularity and recency
- [ ] Tag rhythms and search by tag

<b>Discuss rhythms</b>
- [ ] Share relevant external links for rhythms (recordings)
- [ ] Share a bit of info about yourself on a profile
- [ ] Up/down vote names
- [ ] Wiki-style article body for rhythm

[Details][phase-five]

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
