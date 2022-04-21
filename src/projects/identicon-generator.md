---
title: 'Identicon Generator'
summary: 'A tool which generates random images similar to the GitHub identicons.'
displayOrder: 3
featured: true
image: '/images/projects/identicon-generator.png'
imageAlt: 'Screenshot of the Identicon Generator project'
url: 'https://smzr.github.io/identicon-generator/'
codeUrl: 'https://github.com/smzr/identicon-generator'
---
## Initial idea
I liked the way that GitHub generated unique profile pictures for each user, so I decided to recreate the Identicon generator using a Javascript canvas.

## Result
Built with pure Javascript in a day, this small project could easily be integrated into a much larger website for unique profile pictures. I used the golden rule to generate colours that are pleasing for the eye. The canvas is mapped out as a matrix in the code and the left side is randomly generated then mirrored onto the right to create the final image. I also made it so the identicon can be scaled to many grid sizes.