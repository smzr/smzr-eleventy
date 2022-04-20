---
title: Adding Netlify CMS to 11ty
date: 2022-04-20T18:05:51.398Z
---
Towards the end of 2021 I rebuilt my website using the static site generator [11ty](https://www.11ty.dev/docs/). The source files are hosted on GitHub then built and deployed using [Netlify](https://www.netlify.com/). Currently, adding content to my website means I have to create markdown files and push updates to a GitHub repository. 

---

I thought it would be nice to add a simple CMS to the project so I can add content through visual editors. I was stuck between using [Sanity](https://www.sanity.io/) or [Netlify CMS](https://www.netlifycms.org/), but after a brief look at the setup of each, Netlify CMS seemed much easier and lightweight.

## Restrict access using Netlify's Identity service
Netlify Identity service allows you to manage and authenticate users on your site or app, without requiring them to be users of Netlify or any other service. We will use this to restrict access to the CMS of your website.

### Enable Identity service

1. In the Netlify UI, head to your website project
2. Open the **Site settings**
3. Head to the **Identity** tab and click **Enable Identity**

Now that the Identity Service is enabled you can invite users by email to create an identity for your website, you can also make the identity service open so anyone can sign up to your website. I made mine invite-only as I only wanted to give myself access to the CMS.

### Enable Git Gateway

Netlify’s Git Gateway connects your site to GitHub’s API. This allows Netlify to write to your project's repository. This is required so you can post content from the CMS interface.

Under the **Identity** section of the Site settings head to **Services > Git Gateway**, and click Enable Git Gateway. For my purpose the roles are not relevant, but you can read more about those in the Netlify Identity Docs.

## Adding Netlify CMS

To add the CMS you need to create an `admin` folder within the source directory, by default this is `/_site` but I prefer to name mine to `/src`.

The admin folder structure should be as follows:

```
admin
 ├ index.html
 └ config.yml
```

### index.html

The html file is the entry point to the CMS admin interface, this means that you would navigate to `yourwebsite.com/admin` to access it. The page will load the Netlify CMS JavaScript and will be protected by Netlify's Identity service. 

Add the following snippet to `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

### config.yml

This file is YAML markdown which defines your CMS Schema. First we need to write the *backend* configuration. I'm using a Github repository so the first section is as follows:

```yaml
backend:
  name: git-gateway
  branch: master # Branch to update (optional; defaults to master)
```

We configured the Git Gateway previously so this should sync up fine. Next we will define the folder which images can be found in the repository and the slug we want to output the images on the domain. *media_folder is the source and public_folder is the slug*.


```yaml
media_folder: "src/images"
public_folder: "/images"
```

Finally we add the collections which define the structure for different content types on the website. This will probably be different for your site but this is what I use for my blog, projects and global data.

```yaml
collections:
  # Blog posts
  - name: "blog"
    label: "Blog"
    folder: "src/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Tags", name: "tags", widget: "list" }
      - { label: "Body", name: "body", widget: "markdown" }
  # Projects
  - name: "projects"
    label: "Projects"
    folder: "src/projects"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Summary", name: "summary", widget: "string" }
      - { label: "Display Order", name: "displayOrder", widget: "string" }
      - { label: "Featured", name: "featured", widget: "boolean" }
      - { label: "Image", name: "image", widget: "file" }
      - { label: "Image Alt", name: "imageAlt", widget: "string" }
      - { label: "URL", name: "url", widget: "string" }
      - { label: "Repository URL", name: "codeUrl", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
  - label: "Globals"
    name: "globals"
    files:
      - label: "Site Data"
        name: "site_data"
        delete: false
        file: "src/_data/site.json"
        fields:
          - {label: "Site Name", name: "name", widget: "string"}
          - {label: "Site Url", name: "url", widget: "string"}
          - {label: "Author Name", name: "authorName", widget: "string"}
          - {label: "Author Email Address", name: "authorEmail", widget: "string"}
          - {label: "Author Twitter Handle", name: "authorHandle", widget: "string", required: false}
      - label: "Navigation"
        name: "nav"
        delete: false
        file: "src/_data/navigation.json"
        fields:
          - label: "Items"
            name: "items"
            widget: "list"
            fields:
              - {label: "Text", name: "text", widget: "string"}
              - {label: "Url", name: "url", widget: "string"}
              - {label: "Is url to external site?", name: "external", widget: "boolean", required: false}
      - label: "Snippets"
        name: "snippets"
        delete: false
        file: "src/_data/snippets.json"
        fields:
          - label: "Items"
            name: "items"
            widget: "list"
            fields:
              - {label: "Text", name: "text", widget: "string"}
              - {label: "Url", name: "url", widget: "string"}
              - {label: "Is url to external site?", name: "external", widget: "boolean", required: false}
```

This is what a blog post markdown file looks like on my website.

`/src/blog/11ty-website-rebuild.md`:

```yaml
---
title: 'Yet another website rebuild - 11ty'
date: '2021-09-12'
tags:
  - 'tag 1'
  - 'tag 2'
---

So I decided to rebuild my website...
```

## Access the CMS

Once you have pushed all the changes to your repository you can head to `yourwebsite.com/admin` which should prompt a login. Head to the **Identity** tab in your Site settings and select **Invite users**. Include the email you want to use to login and send yourself an email invitation. Clicking the confirmation link in that email with take you to your site and allow you to set a password.

Now head to `yourwebsite.com/admin` and login again. You should now see an interface for your CMS with the collections configured previously.

---

Your Netlify CMS setup can be improved further through adding (Custom Previews)[https://www.netlifycms.org/docs/customization/] to match your website styling or you could add [editorial workflows](https://www.netlifycms.org/docs/configuration-options/#publish-mode), which adds an interface for drafting, reviewing and approving posts before they go live on a website.

Enjoy!