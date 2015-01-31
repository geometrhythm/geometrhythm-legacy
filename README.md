# Geometrhythm

## Minimum Viable Product
Geometrhythm is a network inspired by Soundcloud, but specifically for rhythms.

Users can:

Design rhythms
- [] Use a visual tool to create a rhythm from scratch
- [] Name rhythms and save them
- [] Listen to the rhythm online

Discover rhythms
- [] Browse other users' favorited & created rhythms
- [] Tag rhythms and search by tag

Discuss rhythms
- [] Sign up, log in, and create a profile
- [] Like a rhythm
- [] See play counts of rhythms


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Splash (~2 days)

Having an account is not necessary to get started with Geometrhythm: the splash page is ready to go with a rhythm to play, and an interactive, animated tool you can use to play around with it. This bit is of paramount importance to have working first.

### Phase 2: Accounts & Show (~2 days)

When the current rhythm already exists in the database, a teasingly small amount of info about it is displayed out to the side. When the rhythm hasn't been "discovered" yet, it is possible to claim it. This is the hook that will make users want to join. I'll need to have a working way to sign up/in and reach the show page for a rhythm, probably from a dropdown from a navbar up top - no separate page necessary.

For now, the show page won't be significantly different than the splash page. The rhythm will be playable but not interactive like the splash page. It will show its name, creator, likers, comments, and play count. You will be able to like the rhythm, tag it, or comment on it. This is a vertical slice; navigation will still be manual from the URL bar until...

### Phase 3: List (~2 days)

The index view is dominated by a paginated collection of rhythms, and its right-hand sidebar allows filtering by creator, liker, or tag. Visiting the index from different contexts pre-sets these filters, making it multipurpose, and thus very important for me to get working. Like the show view, the rhythm will be playable but not interactive.

### Phase 4: Polish (~1 day)

Because the user can return to the splash/root page to create and save new rhythms, at this point the core functionality of Geometrhythm is complete. Of most importance will be making sure what I've got is responsive and refined.

### Phase 5: Stretch Goals

My most important stretch goal is to be able to turn on edit mode for a rhythm from the show page, so that as the rhythm changed the surrounding subviews would update to reflect. That is, if I switched a couple beats around and the new rhythm was already in the database, its info would show; or if it was a new rhythm, I'd be able to name it right away. I expect this would be a challenge to implement, but impressive to employers!

Further stretch goals:

Design rhythms
- [] Onboarding
- [] Upload your own percussion sample to use for playback
- [] Download rhythms as MIDI

Discover rhythms
- [] Find rhythms related by shared geometric properties
- [] Find rhythms based on popularity and recency

Discuss rhythms
- [] Reference specific pulses of a rhythms in a comment
- [] Share relevant external links for rhythms (recordings)
- [] Share a bit of info about yourself on a profile
