addEventListener('fetch', (event) => {
    event.respondWith(fetchAndReplace(event.request));
});

async function fetchAndReplace(request) {
    const modifiedHeaders = new Headers();

    modifiedHeaders.set('Content-Type', 'text/html');
    modifiedHeaders.append('Pragma', 'no-cache');

    // Return maint page if you're not calling from a trusted IP
    if (request.headers.get('cf-connecting-ip') !== '77.85.23.148') {
        // Return modified response
        return new Response(maintPage, {
            headers: modifiedHeaders,
        });
    }

    // Fire all other requests directly to the WebServers
    return fetch(request);
}

const maintPage = `
  <!DOCTYPE html>
  <title>Site Maintenance | Shorty</title>
  <style>
    body {
      font: 20px Helvetica, sans-serif;
      color: #333;
      text-align: center;
      padding: 150px;
      background-size: cover;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
    }

    .content {
      background-color: rgba(255, 255, 255, 0.75);
      background-size: 100%;
      color: inherit;
      padding: 1px 100px 10px 100px;
      border-radius: 15px;
    }

    h1 {
      font-size: 40pt;
    }

    article {
      display: block;
      text-align: left;
      width: 75%;
      margin: 0 auto;
    }
  </style>

  <article>
    <div class="content">
      <h1>We&rsquo;ll be back soon!</h1>
      <p>We are performing maintenance. Please check back later...</p>
      <p>
        &mdash; <b><font color="red">{</font></b
        >shorty.page<b><font color="red">}</font></b> Team
      </p>
    </div>
  </article>`;
