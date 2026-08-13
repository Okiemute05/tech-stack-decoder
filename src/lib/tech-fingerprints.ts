/**
 * Technology Fingerprint Library
 *
 * Each entry defines detection patterns for a specific technology.
 * The detector checks HTTP headers, <script> src attributes,
 * <meta> tags, <link> tags, and raw HTML body content against these patterns.
 */

export interface TechFingerprint {
  name: string;
  slug: string;
  category: "Frontend" | "Backend" | "Database" | "Analytics" | "Other";
  description: string;
  eli5_description: string;
  website_url: string;
  patterns: {
    /** Patterns matched against HTTP response header values (header name is checked separately) */
    headers: { name: string; value: RegExp }[];
    /** Patterns matched against <script src="..."> attribute values */
    scripts: RegExp[];
    /** Patterns matched against <meta> tag name+content pairs */
    meta: { name: string; content: RegExp }[];
    /** Patterns matched against the raw HTML body string */
    html: RegExp[];
    /** Patterns matched against <link href="..."> attribute values */
    links: RegExp[];
  };
}

export const TECH_FINGERPRINTS: TechFingerprint[] = [
  // ═══════════════════════════════════════════════════════════════
  // FRONTEND FRAMEWORKS & LIBRARIES
  // ═══════════════════════════════════════════════════════════════
  {
    name: "React",
    slug: "react",
    category: "Frontend",
    description:
      "A JavaScript library for building user interfaces based on components. Maintained by Meta and a large open-source community, it powers millions of web apps.",
    eli5_description:
      "Imagine building a Lego house. Instead of building the whole house at once, you create small pieces (a window, a door, a wall) and snap them together. React works the same way — programmers build tiny reusable blocks called 'components' and combine them into a full website.",
    website_url: "https://react.dev",
    patterns: {
      headers: [],
      scripts: [/react(?:\.production|\.development)?(?:\.min)?\.js/i, /react-dom/i],
      meta: [],
      html: [/data-reactroot/i, /data-reactid/i, /_reactRootContainer/i, /__react/i],
      links: [],
    },
  },
  {
    name: "Next.js",
    slug: "nextjs",
    category: "Frontend",
    description:
      "A React-based framework that provides server-side rendering, static site generation, and a full-stack development experience. Built by Vercel.",
    eli5_description:
      "If React is like having a box of Legos, Next.js is like getting the instruction booklet too. It tells React how to organize everything — which pages to build, how to load them fast, and how to talk to the internet.",
    website_url: "https://nextjs.org",
    patterns: {
      headers: [{ name: "x-powered-by", value: /Next\.js/i }],
      scripts: [/_next\/static/i, /_next\/data/i, /next\/dist/i],
      meta: [],
      html: [/__NEXT_DATA__/i, /__next/i, /next-route-announcer/i],
      links: [/_next\/static\/css/i],
    },
  },
  {
    name: "Vue.js",
    slug: "vuejs",
    category: "Frontend",
    description:
      "A progressive JavaScript framework for building web UIs. Known for its gentle learning curve and flexible architecture.",
    eli5_description:
      "Vue is like a magic coloring book. You draw the outline (your HTML), and Vue fills in the colors and makes things move when you tap on them. It's designed to be easy to pick up, even for beginners.",
    website_url: "https://vuejs.org",
    patterns: {
      headers: [],
      scripts: [/vue(?:\.runtime)?(?:\.global)?(?:\.prod)?(?:\.min)?\.js/i],
      meta: [],
      html: [/data-v-[a-f0-9]+/i, /id="__vue/i, /data-vue-/i, /__vue_app__/i],
      links: [],
    },
  },
  {
    name: "Nuxt",
    slug: "nuxt",
    category: "Frontend",
    description:
      "A full-stack framework built on top of Vue.js, providing server-side rendering, static generation, and a powerful module ecosystem.",
    eli5_description:
      "If Vue is the coloring book, Nuxt is the whole art kit — it comes with crayons, stickers, and stencils all organized for you so you can build beautiful things faster.",
    website_url: "https://nuxt.com",
    patterns: {
      headers: [],
      scripts: [/_nuxt\//i],
      meta: [],
      html: [/__NUXT__/i, /__nuxt/i, /nuxt-/i],
      links: [/_nuxt\//i],
    },
  },
  {
    name: "Angular",
    slug: "angular",
    category: "Frontend",
    description:
      "A platform and framework for building single-page client applications using HTML and TypeScript. Developed and maintained by Google.",
    eli5_description:
      "Angular is like a big construction set with all the tools built in — the hammer, the saw, the measuring tape. Google made it so big teams can build huge apps without everything falling apart.",
    website_url: "https://angular.dev",
    patterns: {
      headers: [],
      scripts: [/angular(?:\.min)?\.js/i, /main\.[a-f0-9]+\.js/i],
      meta: [],
      html: [/ng-version/i, /ng-app/i, /ng-controller/i, /_nghost-/i, /_ngcontent-/i, /ng-star-inserted/i],
      links: [],
    },
  },
  {
    name: "Svelte",
    slug: "svelte",
    category: "Frontend",
    description:
      "A radical new approach to building UIs. Svelte compiles your code into tiny, framework-less vanilla JS at build time, so there's no runtime overhead.",
    eli5_description:
      "Most tools give you a toolkit you carry around everywhere. Svelte is different — it builds your toy at the factory and delivers it ready-made. No extra parts, no instruction manual needed. It just works, super fast.",
    website_url: "https://svelte.dev",
    patterns: {
      headers: [],
      scripts: [],
      meta: [],
      html: [/svelte-[a-z0-9]+/i, /__svelte/i, /class="svelte-/i],
      links: [],
    },
  },
  {
    name: "SvelteKit",
    slug: "sveltekit",
    category: "Frontend",
    description:
      "The official application framework for Svelte, providing routing, server-side rendering, and a streamlined developer experience.",
    eli5_description:
      "If Svelte is the factory that builds your toy, SvelteKit is the entire delivery service — it packages it, ships it, and makes sure it gets to your door as fast as possible.",
    website_url: "https://svelte.dev/docs/kit",
    patterns: {
      headers: [],
      scripts: [/_app\/immutable/i],
      meta: [],
      html: [/sveltekit/i, /data-sveltekit/i],
      links: [/_app\/immutable/i],
    },
  },
  {
    name: "jQuery",
    slug: "jquery",
    category: "Frontend",
    description:
      "A fast, small, and feature-rich JavaScript library. It simplifies HTML document traversal, event handling, and animation.",
    eli5_description:
      "jQuery is like training wheels for web programming. Back in the day, talking to web browsers was really hard. jQuery made it easy by giving everyone simple shortcuts like 'find this thing and make it disappear.'",
    website_url: "https://jquery.com",
    patterns: {
      headers: [],
      scripts: [/jquery(?:\.min)?\.js/i, /jquery[-.][\d.]+(?:\.min)?\.js/i],
      meta: [],
      html: [/jquery/i],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // CSS FRAMEWORKS
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Tailwind CSS",
    slug: "tailwindcss",
    category: "Frontend",
    description:
      "A utility-first CSS framework that lets you build designs directly in your markup using pre-built utility classes.",
    eli5_description:
      "Instead of writing long descriptions of how things should look, Tailwind gives you tiny sticker labels — 'make it blue,' 'make it big,' 'add a shadow' — and you just stick them onto your HTML elements.",
    website_url: "https://tailwindcss.com",
    patterns: {
      headers: [],
      scripts: [/tailwind/i],
      meta: [],
      html: [
        /class="[^"]*(?:flex|grid|items-center|justify-center|bg-|text-|rounded-|px-|py-|mt-|mb-|ml-|mr-)[^"]*"/i,
      ],
      links: [/tailwind/i],
    },
  },
  {
    name: "Bootstrap",
    slug: "bootstrap",
    category: "Frontend",
    description:
      "The world's most popular CSS framework for responsive, mobile-first web development. Provides a grid system, pre-styled components, and JavaScript plugins.",
    eli5_description:
      "Bootstrap is like a box of pre-made furniture from IKEA. You pick the pieces you want (buttons, menus, cards) and they already look good together. No need to design everything from scratch.",
    website_url: "https://getbootstrap.com",
    patterns: {
      headers: [],
      scripts: [/bootstrap(?:\.bundle)?(?:\.min)?\.js/i],
      meta: [],
      html: [/class="[^"]*\b(?:navbar-expand|col-sm-\d|form-control|btn-primary|modal-dialog|carousel-inner)\b/i],
      links: [/bootstrap(?:\.min)?\.css/i],
    },
  },
  {
    name: "Material UI",
    slug: "material-ui",
    category: "Frontend",
    description:
      "A comprehensive library of React components implementing Google's Material Design. Provides ready-to-use UI building blocks.",
    eli5_description:
      "Material UI is like getting the same building blocks that Google uses for Gmail and YouTube, but for your own website. Everything looks clean and professional because Google designed it.",
    website_url: "https://mui.com",
    patterns: {
      headers: [],
      scripts: [/@mui/i, /material-ui/i],
      meta: [],
      html: [/MuiButton/i, /MuiTypography/i, /MuiBox/i, /mui-/i, /class="[^"]*Mui[A-Z]/i],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // BACKEND FRAMEWORKS & RUNTIMES
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Node.js",
    slug: "nodejs",
    category: "Backend",
    description:
      "A JavaScript runtime built on Chrome's V8 engine. It lets developers use JavaScript for server-side programming, enabling full-stack JS development.",
    eli5_description:
      "Normally JavaScript can only run inside your web browser. Node.js is like giving JavaScript a passport so it can travel outside the browser and run on the server — the big computer that powers websites.",
    website_url: "https://nodejs.org",
    patterns: {
      headers: [
        { name: "x-powered-by", value: /Express/i },
        { name: "x-powered-by", value: /Node/i },
      ],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Express",
    slug: "express",
    category: "Backend",
    description:
      "A minimal and flexible Node.js web application framework providing a robust set of features for web and mobile applications.",
    eli5_description:
      "Express is like a postal worker for websites. When someone asks for a webpage, Express figures out which page to send back and delivers it. It's the most popular way to handle web requests in Node.js.",
    website_url: "https://expressjs.com",
    patterns: {
      headers: [{ name: "x-powered-by", value: /^Express$/i }],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Django",
    slug: "django",
    category: "Backend",
    description:
      "A high-level Python web framework that encourages rapid development and clean, pragmatic design. Powers sites like Instagram and Pinterest.",
    eli5_description:
      "Django is like a super-organized recipe book for building websites with Python. It already has recipes for user logins, databases, and admin panels — so you don't have to figure out those tricky parts yourself.",
    website_url: "https://www.djangoproject.com",
    patterns: {
      headers: [{ name: "x-frame-options", value: /DENY/i }],
      scripts: [],
      meta: [],
      html: [/<input[^>]+name="csrfmiddlewaretoken"/i, /__admin_media_prefix__/i, /window\.django/i],
      links: [],
    },
  },
  {
    name: "Ruby on Rails",
    slug: "ruby-on-rails",
    category: "Backend",
    description:
      "A full-stack web application framework written in Ruby. Known for convention over configuration, it powers sites like GitHub, Shopify, and Basecamp.",
    eli5_description:
      "Rails is like a train on tracks — it knows exactly where to go. Instead of making a million decisions about how to build your website, Rails says 'follow this path' and everything just works.",
    website_url: "https://rubyonrails.org",
    patterns: {
      headers: [
        { name: "x-powered-by", value: /Phusion Passenger/i },
        { name: "server", value: /Phusion Passenger/i },
      ],
      scripts: [],
      meta: [{ name: "csrf-token", content: /.*/ }],
      html: [/csrf-token/i, /data-turbo/i, /turbolinks/i, /action="[^"]*\.rails/i],
      links: [],
    },
  },
  {
    name: "Laravel",
    slug: "laravel",
    category: "Backend",
    description:
      "A PHP web application framework with expressive, elegant syntax. It provides tools for routing, authentication, and database management.",
    eli5_description:
      "Laravel makes PHP (a popular programming language) fun again. It's like upgrading from a flip phone to a smartphone — same basic idea, but everything is smoother and easier.",
    website_url: "https://laravel.com",
    patterns: {
      headers: [
        { name: "set-cookie", value: /laravel_session/i },
        { name: "x-powered-by", value: /Laravel/i },
      ],
      scripts: [],
      meta: [],
      html: [/laravel/i, /csrf-token/i, /app\.blade\.php/i],
      links: [],
    },
  },
  {
    name: "WordPress",
    slug: "wordpress",
    category: "Backend",
    description:
      "The world's most popular content management system, powering over 40% of all websites. Built with PHP and MySQL.",
    eli5_description:
      "WordPress is like a website-making machine. You don't need to know how to code — just pick a design, write your words, upload your pictures, and you have a website. It's how most blogs and small business sites are built.",
    website_url: "https://wordpress.org",
    patterns: {
      headers: [{ name: "link", value: /wp-json/i }],
      scripts: [/wp-content/i, /wp-includes/i],
      meta: [{ name: "generator", content: /WordPress/i }],
      html: [/wp-content/i, /wp-includes/i],
      links: [/wp-content/i, /wp-includes/i],
    },
  },
  {
    name: "PHP",
    slug: "php",
    category: "Backend",
    description:
      "A widely-used server-side scripting language designed for web development. It powers the backend of Facebook, Wikipedia, and millions of other sites.",
    eli5_description:
      "PHP is like the chef in the kitchen of a restaurant. You (the customer) see a nice menu, but in the back, PHP is cooking up the actual pages and serving them to your browser.",
    website_url: "https://www.php.net",
    patterns: {
      headers: [
        { name: "x-powered-by", value: /PHP/i },
        { name: "set-cookie", value: /PHPSESSID/i },
      ],
      scripts: [],
      meta: [],
      html: [/\.php/i],
      links: [],
    },
  },
  {
    name: "ASP.NET",
    slug: "aspnet",
    category: "Backend",
    description:
      "A framework by Microsoft for building web apps and services with .NET and C#. Powers many enterprise-grade applications.",
    eli5_description:
      "ASP.NET is Microsoft's big toolkit for building serious websites. Banks, hospitals, and big companies use it because Microsoft makes sure everything is super secure and reliable.",
    website_url: "https://dotnet.microsoft.com/en-us/apps/aspnet",
    patterns: {
      headers: [
        { name: "x-powered-by", value: /ASP\.NET/i },
        { name: "x-aspnet-version", value: /./i },
      ],
      scripts: [],
      meta: [],
      html: [/__VIEWSTATE/i, /__EVENTVALIDATION/i, /aspnetForm/i],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // DATABASES (detected indirectly)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Firebase",
    slug: "firebase",
    category: "Database",
    description:
      "Google's app development platform providing real-time databases, authentication, hosting, and cloud functions. A popular backend-as-a-service.",
    eli5_description:
      "Firebase is like renting a fully-furnished apartment instead of building a house. Google gives you a database, user logins, file storage, and hosting all in one — so you can focus on making your app fun.",
    website_url: "https://firebase.google.com",
    patterns: {
      headers: [],
      scripts: [/firebase/i, /firebasejs/i, /firebaseapp/i, /gstatic\.com\/firebasejs/i],
      meta: [],
      html: [/__FIREBASE_DEFAULTS__/i, /firebaseio\.com/i, /firebase-app\.js/i],
      links: [],
    },
  },
  {
    name: "Supabase",
    slug: "supabase",
    category: "Database",
    description:
      "An open-source Firebase alternative providing a PostgreSQL database, authentication, storage, and real-time subscriptions.",
    eli5_description:
      "Supabase is like Firebase but built on top of a really powerful database called PostgreSQL. It gives you all the same easy tools, but with the strength of a 'grown-up' database under the hood.",
    website_url: "https://supabase.com",
    patterns: {
      headers: [],
      scripts: [/supabase/i],
      meta: [],
      html: [/\.supabase\.co/i],
      links: [],
    },
  },
  {
    name: "MongoDB",
    slug: "mongodb",
    category: "Database",
    description:
      "A document-oriented NoSQL database that stores data in flexible, JSON-like documents. Popular for modern web applications.",
    eli5_description:
      "Most databases store information in tables (like a spreadsheet). MongoDB stores information in little packets that look like notes — you can put whatever you want in each one without following strict rules.",
    website_url: "https://www.mongodb.com",
    patterns: {
      headers: [],
      scripts: [/mongodb/i, /mongoose/i],
      meta: [],
      html: [],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ANALYTICS & MARKETING
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Google Analytics",
    slug: "google-analytics",
    category: "Analytics",
    description:
      "Google's free web analytics service that tracks and reports website traffic. Used by over 50 million websites worldwide.",
    eli5_description:
      "Google Analytics is like a security camera for your website, but instead of watching for bad guys, it watches who visits, where they came from, and which pages they liked most.",
    website_url: "https://analytics.google.com",
    patterns: {
      headers: [],
      scripts: [
        /google-analytics\.com\/analytics\.js/i,
        /googletagmanager\.com\/gtag/i,
        /www\.googletagmanager\.com/i,
        /ga\.js/i,
      ],
      meta: [],
      html: [/gtag\(/i, /GoogleAnalyticsObject/i, /UA-\d{4,10}-\d{1,4}/i, /G-[A-Z0-9]+/i],
      links: [],
    },
  },
  {
    name: "Google Tag Manager",
    slug: "google-tag-manager",
    category: "Analytics",
    description:
      "A tag management system that lets you manage and deploy marketing tags (snippets of code) on your website without modifying code.",
    eli5_description:
      "Imagine your website needs lots of little stickers (tracking codes) from different companies. Google Tag Manager is like a sticker album — you put all the stickers in one place and manage them easily.",
    website_url: "https://tagmanager.google.com",
    patterns: {
      headers: [],
      scripts: [/googletagmanager\.com\/gtm\.js/i],
      meta: [],
      html: [/GTM-[A-Z0-9]+/i, /google_tag_manager/i],
      links: [],
    },
  },
  {
    name: "Hotjar",
    slug: "hotjar",
    category: "Analytics",
    description:
      "A behavior analytics tool that reveals how users interact with your website through heatmaps, session recordings, and surveys.",
    eli5_description:
      "Hotjar lets website owners see exactly what visitors do — where they click, how far they scroll, and where they get confused. It's like watching someone use your website over their shoulder.",
    website_url: "https://www.hotjar.com",
    patterns: {
      headers: [],
      scripts: [/hotjar\.com/i, /static\.hotjar\.com/i],
      meta: [],
      html: [/hotjar/i, /_hjSettings/i],
      links: [],
    },
  },
  {
    name: "Segment",
    slug: "segment",
    category: "Analytics",
    description:
      "A customer data platform that collects, cleans, and controls customer data, routing it to hundreds of analytics and marketing tools.",
    eli5_description:
      "Segment is like a mail sorter. Instead of sending your website data to 10 different analytics tools one by one, you send it all to Segment, and it delivers each piece to the right place.",
    website_url: "https://segment.com",
    patterns: {
      headers: [],
      scripts: [/cdn\.segment\.com/i, /analytics\.min\.js/i],
      meta: [],
      html: [/analytics\.identify/i, /analytics\.track/i, /analytics\.page/i],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // HOSTING & INFRASTRUCTURE
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Vercel",
    slug: "vercel",
    category: "Other",
    description:
      "A cloud platform for frontend frameworks and static sites. The creators of Next.js, providing seamless deployment and edge functions.",
    eli5_description:
      "Vercel is like a rocket launcher for websites. You give it your code, and it puts your website online super fast, all around the world, so people everywhere can see it quickly.",
    website_url: "https://vercel.com",
    patterns: {
      headers: [
        { name: "server", value: /Vercel/i },
        { name: "x-vercel-id", value: /./i },
        { name: "x-vercel-cache", value: /./i },
      ],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Netlify",
    slug: "netlify",
    category: "Other",
    description:
      "A platform for automating modern web projects. Provides continuous deployment, serverless functions, and a global CDN.",
    eli5_description:
      "Netlify is like a magic button for websites. Push your code, and Netlify builds it, tests it, and puts it online — all by itself. It's the easy button for web developers.",
    website_url: "https://www.netlify.com",
    patterns: {
      headers: [
        { name: "server", value: /Netlify/i },
        { name: "x-nf-request-id", value: /./i },
      ],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    category: "Other",
    description:
      "A global network providing CDN, DDoS protection, DNS, and security services. Sits between your website and your visitors for speed and safety.",
    eli5_description:
      "Cloudflare is like a bodyguard and a speed booster for websites. It stands in front of the website, blocks bad guys (hackers), and makes pages load faster by keeping copies closer to visitors.",
    website_url: "https://www.cloudflare.com",
    patterns: {
      headers: [
        { name: "server", value: /cloudflare/i },
        { name: "cf-ray", value: /./i },
        { name: "cf-cache-status", value: /./i },
      ],
      scripts: [],
      meta: [],
      html: [/cdn-cgi/i, /cloudflareinsights/i],
      links: [],
    },
  },
  {
    name: "Amazon Web Services",
    slug: "aws",
    category: "Other",
    description:
      "The world's most comprehensive cloud computing platform, offering over 200 services including compute, storage, databases, and AI.",
    eli5_description:
      "AWS is Amazon's giant computer warehouse that other companies rent to run their websites and apps. Instead of buying your own servers, you borrow Amazon's — and they have warehouses all over the world.",
    website_url: "https://aws.amazon.com",
    patterns: {
      headers: [
        { name: "server", value: /AmazonS3/i },
        { name: "server", value: /Amazon/i },
        { name: "x-amz-request-id", value: /./i },
        { name: "x-amz-cf-id", value: /./i },
      ],
      scripts: [],
      meta: [],
      html: [/amazonaws\.com/i, /\.s3\./i],
      links: [],
    },
  },
  {
    name: "Nginx",
    slug: "nginx",
    category: "Other",
    description:
      "A high-performance web server, reverse proxy, and load balancer. Powers some of the busiest sites on the internet.",
    eli5_description:
      "Nginx is like a super-fast receptionist for websites. When thousands of visitors show up at once, Nginx quickly figures out who needs what and sends them to the right place without getting overwhelmed.",
    website_url: "https://nginx.org",
    patterns: {
      headers: [{ name: "server", value: /nginx/i }],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Apache",
    slug: "apache",
    category: "Other",
    description:
      "The most widely used web server software in the world. An open-source project that has been powering websites since 1995.",
    eli5_description:
      "Apache is the old reliable delivery truck of the internet. It's been delivering web pages to browsers since the very early days of the web — and it's still going strong.",
    website_url: "https://httpd.apache.org",
    patterns: {
      headers: [{ name: "server", value: /Apache/i }],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PAYMENTS & SERVICES
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Stripe",
    slug: "stripe",
    category: "Other",
    description:
      "A technology company that builds economic infrastructure for the internet — handling online payments, subscriptions, and financial transactions.",
    eli5_description:
      "When you buy something online and type in your credit card, Stripe is the invisible helper that safely takes the money from your card and gives it to the store. Millions of websites use it.",
    website_url: "https://stripe.com",
    patterns: {
      headers: [],
      scripts: [/js\.stripe\.com/i, /stripe\.js/i],
      meta: [],
      html: [/stripe/i, /Stripe\(/i],
      links: [],
    },
  },
  {
    name: "Shopify",
    slug: "shopify",
    category: "Other",
    description:
      "A leading e-commerce platform that allows anyone to set up an online store and sell products. Powers millions of businesses worldwide.",
    eli5_description:
      "Shopify is like renting a shop in a mall, but online. They give you the storefront, the cash register, the shelves — you just need to bring your products and start selling.",
    website_url: "https://www.shopify.com",
    patterns: {
      headers: [{ name: "x-shopid", value: /./i }],
      scripts: [/cdn\.shopify\.com/i, /shopify/i],
      meta: [{ name: "shopify-digital-wallet", content: /./i }],
      html: [/Shopify\./i, /shopify/i, /myshopify\.com/i],
      links: [/cdn\.shopify\.com/i],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // OTHER TOOLS & LIBRARIES
  // ═══════════════════════════════════════════════════════════════
  {
    name: "TypeScript",
    slug: "typescript",
    category: "Frontend",
    description:
      "A strongly-typed superset of JavaScript developed by Microsoft. It adds optional types, classes, and modules to JavaScript.",
    eli5_description:
      "TypeScript is like JavaScript with spell-check. It helps programmers catch mistakes before they happen — like a teacher who circles your errors before you turn in your homework.",
    website_url: "https://www.typescriptlang.org",
    patterns: {
      headers: [],
      scripts: [/\.ts\.js/i],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Webpack",
    slug: "webpack",
    category: "Other",
    description:
      "A powerful module bundler for JavaScript applications. It processes and bundles all your code, images, and styles into optimized files.",
    eli5_description:
      "Webpack is like a packing machine. You have lots of files (JavaScript, images, CSS) and Webpack squishes them all together into neat packages that load fast in the browser.",
    website_url: "https://webpack.js.org",
    patterns: {
      headers: [],
      scripts: [/webpack/i, /webpackChunk/i],
      meta: [],
      html: [/webpackChunk/i, /webpackJsonp/i],
      links: [],
    },
  },
  {
    name: "Vite",
    slug: "vite",
    category: "Other",
    description:
      "A next-generation frontend build tool that provides blazing-fast development with hot module replacement and optimized production builds.",
    eli5_description:
      "Vite (French for 'fast') is like an instant-on stove for web development. Old tools make you wait for everything to compile. Vite starts instantly and updates the page the moment you save your code.",
    website_url: "https://vite.dev",
    patterns: {
      headers: [],
      scripts: [/@vite/i, /vite\/client/i],
      meta: [],
      html: [/@vite/i, /vite\/client/i],
      links: [],
    },
  },
  {
    name: "Gatsby",
    slug: "gatsby",
    category: "Frontend",
    description:
      "A React-based static site generator that creates fast, secure websites. Great for blogs, marketing sites, and documentation.",
    eli5_description:
      "Gatsby is like a bakery that pre-bakes all its cakes. Instead of making your webpage every time someone visits, Gatsby bakes all the pages ahead of time so they're ready to serve instantly.",
    website_url: "https://www.gatsbyjs.com",
    patterns: {
      headers: [{ name: "x-powered-by", value: /Gatsby/i }],
      scripts: [],
      meta: [{ name: "generator", content: /Gatsby/i }],
      html: [/gatsby/i, /___gatsby/i],
      links: [],
    },
  },
  {
    name: "Remix",
    slug: "remix",
    category: "Frontend",
    description:
      "A full-stack web framework focused on web standards and modern UX. It leverages server rendering and progressive enhancement.",
    eli5_description:
      "Remix is a newer way to build websites that focuses on speed. It loads pages from the server first (so they show up fast) and then makes them interactive — like getting the skeleton of a building up quickly before adding the furniture.",
    website_url: "https://remix.run",
    patterns: {
      headers: [],
      scripts: [],
      meta: [],
      html: [/__remix/i, /remix-run/i],
      links: [],
    },
  },
  {
    name: "Framer Motion",
    slug: "framer-motion",
    category: "Frontend",
    description:
      "A production-ready motion library for React that makes creating animations simple with a declarative API.",
    eli5_description:
      "Framer Motion makes things on websites move smoothly — fade in, slide around, bounce — without the programmer needing to be an animation expert. It's like giving your website dance moves.",
    website_url: "https://motion.dev",
    patterns: {
      headers: [],
      scripts: [/framer-motion/i],
      meta: [],
      html: [/framer-motion/i],
      links: [],
    },
  },
  {
    name: "Font Awesome",
    slug: "font-awesome",
    category: "Frontend",
    description:
      "The internet's icon library and toolkit, providing thousands of scalable vector icons that can be customized with CSS.",
    eli5_description:
      "Font Awesome is a huge collection of tiny pictures (icons) that websites use — like the little envelope for email, the house for home, or the magnifying glass for search. Instead of drawing them, you just pick from the collection.",
    website_url: "https://fontawesome.com",
    patterns: {
      headers: [],
      scripts: [/fontawesome/i, /font-awesome/i],
      meta: [],
      html: [/class="[^"]*\b(?:fa-solid|fa-regular|fa-brands|fas|fab|far)\s+fa-/i, /fontawesome/i],
      links: [/fontawesome/i, /font-awesome/i],
    },
  },
  {
    name: "Intercom",
    slug: "intercom",
    category: "Other",
    description:
      "A customer messaging platform that provides live chat, chatbots, and customer support tools for websites and apps.",
    eli5_description:
      "That little chat bubble in the bottom-right corner of websites where you can ask questions? That's usually Intercom. It lets companies talk to their visitors in real time.",
    website_url: "https://www.intercom.com",
    patterns: {
      headers: [],
      scripts: [/intercom/i, /widget\.intercom\.io/i],
      meta: [],
      html: [/intercom/i, /intercomSettings/i],
      links: [],
    },
  },
  {
    name: "Zendesk",
    slug: "zendesk",
    category: "Other",
    description:
      "A customer service and engagement platform providing ticketing, messaging, live chat, and knowledge base tools.",
    eli5_description:
      "Zendesk is like a help desk for websites. When customers have problems, Zendesk helps companies track every question and make sure everyone gets an answer.",
    website_url: "https://www.zendesk.com",
    patterns: {
      headers: [],
      scripts: [/zdassets\.com/i, /zendesk/i],
      meta: [],
      html: [/zendesk/i],
      links: [],
    },
  },
  {
    name: "Wix",
    slug: "wix",
    category: "Other",
    description:
      "A cloud-based website builder that allows users to create websites through drag-and-drop tools without coding knowledge.",
    eli5_description:
      "Wix is like a website-making playground. You drag pictures, text, and buttons wherever you want them on the page — no coding needed. It's how many people build their first website.",
    website_url: "https://www.wix.com",
    patterns: {
      headers: [],
      scripts: [/wix\.com/i, /parastorage\.com/i, /wixstatic\.com/i],
      meta: [{ name: "generator", content: /Wix/i }],
      html: [/wix/i, /wixsite\.com/i],
      links: [/parastorage\.com/i],
    },
  },
  {
    name: "Squarespace",
    slug: "squarespace",
    category: "Other",
    description:
      "An all-in-one website builder and hosting platform known for its beautiful templates and design-focused approach.",
    eli5_description:
      "Squarespace is like having a professional designer build your website. You pick a gorgeous template, fill in your content, and it looks like you hired an expensive design agency.",
    website_url: "https://www.squarespace.com",
    patterns: {
      headers: [],
      scripts: [/squarespace/i, /static1\.squarespace\.com/i],
      meta: [{ name: "generator", content: /Squarespace/i }],
      html: [/squarespace/i],
      links: [/squarespace/i],
    },
  },
  {
    name: "Google Fonts",
    slug: "google-fonts",
    category: "Frontend",
    description:
      "A library of over 1,500 open-source font families. The most popular way to add custom typography to websites.",
    eli5_description:
      "Google Fonts is like a free font store. Websites use it to download beautiful lettering styles so their text doesn't look plain and boring. It's used by millions of websites.",
    website_url: "https://fonts.google.com",
    patterns: {
      headers: [],
      scripts: [],
      meta: [],
      html: [],
      links: [/fonts\.googleapis\.com/i, /fonts\.gstatic\.com/i],
    },
  },
  {
    name: "reCAPTCHA",
    slug: "recaptcha",
    category: "Other",
    description:
      "Google's free service that protects websites from spam and abuse by distinguishing humans from bots using advanced risk analysis.",
    eli5_description:
      "Those 'I am not a robot' checkboxes and 'select all the traffic lights' puzzles? That's reCAPTCHA. It's Google's way of making sure real humans are using a website, not sneaky computer programs.",
    website_url: "https://www.google.com/recaptcha",
    patterns: {
      headers: [],
      scripts: [/recaptcha/i, /google\.com\/recaptcha/i],
      meta: [],
      html: [/g-recaptcha/i, /www\.google\.com\/recaptcha\/api\.js/i],
      links: [],
    },
  },
  {
    name: "Astro",
    slug: "astro",
    category: "Frontend",
    description:
      "A modern web framework for building fast, content-focused websites. It ships zero JavaScript by default and supports multiple UI frameworks.",
    eli5_description:
      "Astro is like a smart chef who only cooks what's needed. Most frameworks send a ton of JavaScript to your browser. Astro sends almost none — making your website load lightning fast.",
    website_url: "https://astro.build",
    patterns: {
      headers: [],
      scripts: [],
      meta: [{ name: "generator", content: /Astro/i }],
      html: [/astro-[a-z0-9]+/i, /data-astro/i],
      links: [],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ADDITIONAL TECHNOLOGIES (matched via structural inference)
  // ═══════════════════════════════════════════════════════════════
  {
    name: "Boxicons",
    slug: "boxicons",
    category: "Frontend",
    description:
      "A free collection of carefully crafted open-source icons. Available as web font, SVG, and React components.",
    eli5_description:
      "Boxicons is a big collection of little pictures (icons) like arrows, hearts, and settings gears. Web developers use them to make their sites look polished without drawing every icon by hand.",
    website_url: "https://boxicons.com",
    patterns: {
      headers: [],
      scripts: [/boxicons/i],
      meta: [],
      html: [/bx bx-/i, /boxicons/i],
      links: [/boxicons/i],
    },
  },
  {
    name: "LiteSpeed",
    slug: "litespeed",
    category: "Other",
    description:
      "A high-performance, lightweight web server known for its speed and efficiency. A popular alternative to Apache and Nginx.",
    eli5_description:
      "LiteSpeed is like a super-fast delivery person for websites. It can handle lots of visitors at once and serves pages quicker than many other web servers — kind of like upgrading from a bicycle to a sports car.",
    website_url: "https://www.litespeedtech.com",
    patterns: {
      headers: [{ name: "server", value: /LiteSpeed/i }],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Webflow",
    slug: "webflow",
    category: "Other",
    description:
      "A visual web design and development platform that lets you build responsive websites without writing code.",
    eli5_description:
      "Webflow is like a super-powered drawing app for websites. You drag and drop elements, style them visually, and Webflow writes all the code for you. It's for designers who want full control without coding.",
    website_url: "https://webflow.com",
    patterns: {
      headers: [],
      scripts: [/webflow\.com/i, /webflow\./i],
      meta: [{ name: "generator", content: /Webflow/i }],
      html: [/w-nav/i, /w-slider/i, /w-tabs/i, /wf-/i, /webflow/i],
      links: [/webflow/i],
    },
  },
  {
    name: "HubSpot",
    slug: "hubspot",
    category: "Analytics",
    description:
      "An all-in-one CRM, marketing, sales, and customer service platform. Provides analytics, forms, live chat, and email marketing.",
    eli5_description:
      "HubSpot is like a Swiss Army knife for businesses online. It helps companies find new customers, talk to them, sell to them, and keep them happy — all from one place.",
    website_url: "https://www.hubspot.com",
    patterns: {
      headers: [],
      scripts: [/hubspot/i, /hs-scripts\.com/i, /hsforms/i],
      meta: [],
      html: [/hbspt\./i, /hubspot/i, /hs-cta/i],
      links: [],
    },
  },
  {
    name: "Ghost",
    slug: "ghost",
    category: "Backend",
    description:
      "A powerful, open-source publishing platform built on Node.js. Designed for professional bloggers and publishers.",
    eli5_description:
      "Ghost is like a really clean, fast notepad for writing and publishing on the internet. It's built for writers and bloggers who want their words to look beautiful without the clutter of WordPress.",
    website_url: "https://ghost.org",
    patterns: {
      headers: [{ name: "x-powered-by", value: /Ghost/i }],
      scripts: [/ghost/i],
      meta: [{ name: "generator", content: /Ghost/i }],
      html: [],
      links: [/ghost/i],
    },
  },
  {
    name: "Payload CMS",
    slug: "payload",
    category: "Backend",
    description:
      "A modern headless CMS and application framework built with TypeScript. Combines the flexibility of code with the ease of a CMS.",
    eli5_description:
      "Payload is like a content management system built for developers. Instead of fighting against rigid templates, developers get to build exactly what they want while still having an easy admin panel.",
    website_url: "https://payloadcms.com",
    patterns: {
      headers: [{ name: "x-powered-by", value: /Payload/i }],
      scripts: [],
      meta: [],
      html: [],
      links: [],
    },
  },
  {
    name: "Facebook Pixel",
    slug: "facebook-pixel",
    category: "Analytics",
    description:
      "A piece of code that tracks visitor activity on a website for Facebook/Meta advertising. Helps measure ad effectiveness.",
    eli5_description:
      "Facebook Pixel is like a tiny spy that websites put on their pages to tell Facebook which visitors did what — so Facebook can show those people better ads later.",
    website_url: "https://www.facebook.com/business/tools/meta-pixel",
    patterns: {
      headers: [],
      scripts: [/connect\.facebook\.net/i, /fbevents\.js/i],
      meta: [],
      html: [/fbq\(/i, /facebook-domain-verification/i],
      links: [],
    },
  },
  {
    name: "X (Twitter) Pixel",
    slug: "twitter-pixel",
    category: "Analytics",
    description:
      "A conversion tracking tag for X (Twitter) advertising that measures actions visitors take after seeing or clicking on ads.",
    eli5_description:
      "The X Pixel tells Twitter what people do on a website after clicking a Twitter ad — like buying something or signing up. It helps advertisers see if their Twitter ads are working.",
    website_url: "https://business.x.com",
    patterns: {
      headers: [],
      scripts: [/static\.ads-twitter\.com/i],
      meta: [],
      html: [/twq\(/i],
      links: [],
    },
  },
  {
    name: "LinkedIn Insight Tag",
    slug: "linkedin-insight",
    category: "Analytics",
    description:
      "A lightweight JavaScript tag that enables conversion tracking, retargeting, and analytics for LinkedIn advertising campaigns.",
    eli5_description:
      "LinkedIn's Insight Tag is like a visitor counter specifically for business professionals. It helps companies see which LinkedIn members visit their website and how effective their LinkedIn ads are.",
    website_url: "https://www.linkedin.com/help/lms/answer/a418880",
    patterns: {
      headers: [],
      scripts: [/snap\.licdn\.com/i],
      meta: [],
      html: [/_linkedin_partner_id/i],
      links: [],
    },
  },
  {
    name: "Sentry",
    slug: "sentry",
    category: "Other",
    description:
      "An application monitoring and error tracking platform that helps developers identify and fix crashes in real time.",
    eli5_description:
      "Sentry is like a smoke detector for websites and apps. When something breaks or crashes, Sentry immediately tells the developers exactly what went wrong and where, so they can fix it fast.",
    website_url: "https://sentry.io",
    patterns: {
      headers: [],
      scripts: [/sentry/i, /browser\.sentry-cdn\.com/i],
      meta: [],
      html: [/Sentry\.init/i, /sentry\.io/i],
      links: [],
    },
  },
  {
    name: "Crisp Chat",
    slug: "crisp",
    category: "Other",
    description:
      "A business messaging platform providing live chat, chatbot, and shared inbox features for customer communication.",
    eli5_description:
      "Crisp is a little chat window that pops up on websites so you can talk to someone from the company right away. It's like texting a store employee while you're browsing their website.",
    website_url: "https://crisp.chat",
    patterns: {
      headers: [],
      scripts: [/client\.crisp\.chat/i, /crisp\.chat/i],
      meta: [],
      html: [/crisp/i, /CRISP_WEBSITE_ID/i],
      links: [],
    },
  },
  {
    name: "Drift",
    slug: "drift",
    category: "Other",
    description:
      "A conversational marketing and sales platform that uses chatbots and live chat to help businesses connect with visitors.",
    eli5_description:
      "Drift is a smart chatbot on websites that tries to start a conversation with you — like a friendly shop assistant who asks if you need help, except it's a robot that can answer questions 24/7.",
    website_url: "https://www.drift.com",
    patterns: {
      headers: [],
      scripts: [/js\.driftt\.com/i, /drift\.com/i],
      meta: [],
      html: [/drift-/i],
      links: [],
    },
  },
  {
    name: "Dark Mode",
    slug: "dark-mode",
    category: "Frontend",
    description:
      "A UI feature that offers a dark color scheme, reducing eye strain and saving battery on OLED screens.",
    eli5_description:
      "Dark Mode is when a website lets you switch from bright white backgrounds to cool dark backgrounds. It's easier on your eyes at night and looks really sleek.",
    website_url: "https://web.dev/articles/prefers-color-scheme",
    patterns: {
      headers: [],
      scripts: [],
      meta: [],
      html: [/data-theme=["'](?:dark|night)["']/i, /class="[^"]*\bdark\b/i],
      links: [],
    },
  },
  {
    name: "unpkg CDN",
    slug: "unpkg",
    category: "Other",
    description:
      "A fast, global content delivery network for everything on npm. Lets you load any npm package directly in the browser.",
    eli5_description:
      "unpkg is like a giant library shelf on the internet. Instead of downloading code packages to your computer, websites can borrow them directly from unpkg — fast and easy.",
    website_url: "https://unpkg.com",
    patterns: {
      headers: [],
      scripts: [/unpkg\.com/i],
      meta: [],
      html: [],
      links: [/unpkg\.com/i],
    },
  },
  {
    name: "cdnjs",
    slug: "cdnjs",
    category: "Other",
    description:
      "A free, open-source CDN powered by Cloudflare that hosts popular JavaScript and CSS libraries for fast delivery.",
    eli5_description:
      "cdnjs is a free delivery service for code libraries. Instead of hosting popular tools like jQuery yourself, cdnjs hosts them on super-fast servers all around the world.",
    website_url: "https://cdnjs.com",
    patterns: {
      headers: [],
      scripts: [/cdnjs\.cloudflare\.com/i],
      meta: [],
      html: [],
      links: [/cdnjs\.cloudflare\.com/i],
    },
  },
  {
    name: "jsDelivr CDN",
    slug: "jsdelivr",
    category: "Other",
    description:
      "A free, fast, and reliable CDN for open-source projects. Serves files from npm, GitHub, and WordPress plugins.",
    eli5_description:
      "jsDelivr is another free delivery service for code. It's really popular because it's super fast and can serve files from lots of different sources like npm and GitHub.",
    website_url: "https://www.jsdelivr.com",
    patterns: {
      headers: [],
      scripts: [/cdn\.jsdelivr\.net/i],
      meta: [],
      html: [],
      links: [/cdn\.jsdelivr\.net/i],
    },
  },
];
