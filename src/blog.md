---
title: 'Posts'
layout: 'layouts/blog.html'
pagination:
  data: collections.postsByYear
  size: 365
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Prev'
paginationNextText: 'Next'
paginationAnchor: ''
metaDesc: 'Sammy McKay''s development blog.'
---