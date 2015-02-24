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

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

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
