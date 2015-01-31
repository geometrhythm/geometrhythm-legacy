# Phase 2: JSON API and First Backbone Views

## Rails
### Models

### Controllers
Api::BlogsController (create, destroy, index, show)
Api::PostsController (create, destroy, show, update)

### Views
* blogs/show.json.jbuilder

## Backbone
### Models
* Blog (parses nested `posts` association)
* Post

### Collections
* Blogs
* Posts

### Views
* BlogShow (composite view, contains PostShow subviews)
* PostShow

## Gems/Libraries
