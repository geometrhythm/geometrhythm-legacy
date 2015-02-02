# Geometrhythm

[Heroku link][heroku]

[heroku]: https://geometrhythm.herokuapp.com/

## Minimum Viable Product
Geometrhythm is a network inspired by Soundcloud, but specifically for rhythms.

Users can:

<b>Design rhythms</b>
- [ ] Use a visual tool to create a rhythm
- [ ] Listen to the rhythm
- [ ] Name the rhythm and save it

<b>Discover rhythms</b>
- [ ] Sign up, log in, and create a profile
- [ ] Browse other users' created & liked rhythms
- [ ] Tag rhythms and search by tag

<b>Discuss rhythms</b>
- [ ] Like a rhythm
- [ ] Comment on a rhythm
- [ ] See play counts of rhythms

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Splash (~2 days)

Having an account is not necessary to get started with Geometrhythm: the splash page is ready to go with a rhythm to play, and an interactive, animated tool you can use to play around with it. This bit is of paramount importance to have working first.

The good news is that I pretty much have this working already - been hacking away at it for the last week during breaks, before lectures, and whenever I've finished the evening's work with time to spare. This will free up my time to focus on the important Rails/Backbone stuff.

Also, please enjoy what my Asteroids project became: http://rainbowbbles.com.s3-website-us-west-1.amazonaws.com/
I own the domain rainbowbbles.com but whatever I did to redirect AWS apparently did not work...

[Details][phase-one]

### Phase 2: Accounts & Show (~2 days)

When the current rhythm already exists in the database, a teasingly small amount of info about it is displayed out to the side. When the rhythm hasn't been "discovered" yet, it is possible to claim it. This is the hook that will make users want to join. I'll need to have a working way to sign up/in and reach the show page for a rhythm, probably from a dropdown from a navbar up top or modal form - no separate page necessary.

For now, the show page won't be significantly different than the splash page. The rhythm will be playable but not interactive like the splash page. It will show its name, creator, likers, comments, and play count. You will be able to like the rhythm, tag it, or comment on it. This is a vertical slice; navigation will still be manual from the URL bar until...

[Details][phase-two]

### Phase 3: List (~2 days)

The index view is dominated by a paginated collection of rhythms, and its right-hand sidebar allows filtering by creator, liker, or tag. Visiting the index from different contexts pre-sets these filters, making it multipurpose, and thus very important for me to get working. Like the show view, the rhythm will be playable but not interactive.

[Details][phase-three]

### Phase 4: Polish (~1 day)

Because the user can return to the splash/root page to create and save new rhythms, at this point the core functionality of Geometrhythm is complete. Of most importance will be making sure what I've got is responsive and refined.

[Details][phase-four]

### Phase 5: Stretch Goals

My most important stretch goal is to be able to turn on edit mode for a rhythm from the show page, so that as the rhythm changed the surrounding subviews would update to reflect. That is, if I switched a couple beats around and the new rhythm was already in the database, its info would show; or if it was a new rhythm, I'd be able to name it right away. I expect this would be a challenge to implement, but impressive to employers!

[Details][phase-five]

Further stretch goals:

<b>Design rhythms</b>
- [ ] Onboarding, tool tips
- [ ] Upload your own percussion sample to use for playback
- [ ] Download rhythms as MIDI

<b>Discover rhythms</b>
- [ ] Find rhythms related by shared geometric properties
- [ ] Investigate these properties using beautiful graphs/charts/histograms
- [ ] Find rhythms based on popularity and recency

<b>Discuss rhythms</b>
- [ ] Reference specific pulses of a rhythms in a comment
- [ ] Share relevant external links for rhythms (recordings)
- [ ] Share a bit of info about yourself on a profile
- [ ] Up/down vote names
- [ ] Comment on comments
- [ ] Wiki-style article body for rhythm

At first glance, being "a Soundcloud for rhythms", Geometrhythm might seem like a subset. But not exactly! The set of possible rhythms is many orders of magnitude smaller than the set of possible audio waveforms, so in that sense Geomerhythm is maybe more like a cross between Soundcloud and the OEIS.

I'd love to show off my algorithm skills by getting to the stretch goal of coding the geometric analyses of the rhythms. I do see Geometrhythm as a project which will go on to provide value to many people, but don't kid myself that I'll get all the way there in 2 weeks. As a musician and recreational mathematician I am passionate about this project and can't wait to use it myself! Building tools like this is why I write code.

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
