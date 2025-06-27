export type Lesson = {
  id: string;
  title: string;
  type: 'video' | 'article';
  duration: number; // in minutes
  content: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  image: string;
  category: string;
  modules: Module[];
  'data-ai-hint'?: string;
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Advanced JavaScript & AI',
    description: 'Master modern JavaScript and integrate AI for powerful web applications.',
    longDescription: 'This course dives deep into advanced JavaScript concepts including asynchronous patterns, performance optimization, and modern syntax. You will also learn how to leverage the power of AI APIs to build intelligent features like chatbots, content summarizers, and recommendation engines directly into your web projects.',
    instructor: {
      name: 'Dr. Evelyn Reed',
      title: 'Senior AI Engineer',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'glowing code',
    category: 'Programming',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Asynchronous JavaScript',
        lessons: [
          { id: 'l1_1', title: 'Promises and Async/Await', type: 'video', duration: 25, content: 'This lesson covers the fundamentals of asynchronous programming in JavaScript. We explore how Promises work and how the async/await syntax provides a cleaner way to handle asynchronous operations. We will walk through practical examples of fetching data from an API and managing asynchronous control flow. The content is crucial for building non-blocking applications.' },
          { id: 'l1_2', title: 'The Event Loop', type: 'article', duration: 15, content: 'A deep dive into the JavaScript Event Loop. Understanding the event loop is key to understanding how JavaScript handles asynchronous code. This article explains the call stack, callback queue, and how they interact to execute code. We will visualize the process to make it easier to grasp.' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Introduction to AI APIs',
        lessons: [
          { id: 'l2_1', title: 'Connecting to Generative AI', type: 'video', duration: 30, content: 'Learn how to connect your JavaScript application to a powerful Generative AI model. This lesson provides a step-by-step guide on setting up your environment, obtaining API keys, and making your first API call to generate text. We will build a simple "idea generator" application.' },
          { id: 'l2_2', title: 'Building an AI Summarizer', type: 'article', duration: 45, content: 'This hands-on lesson guides you through building a practical AI tool: a text summarizer. You will learn about prompt engineering techniques to get the best results from the AI. We will use the concepts from previous lessons to create a web interface where users can paste text and get a concise summary.' },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'UI/UX Design with Figma',
    description: 'From wireframes to interactive prototypes, learn the complete design process.',
    longDescription: 'This comprehensive course takes you through the entire UI/UX design process using Figma, the industry-standard design tool. You will learn about user research, creating user personas, wireframing, designing high-fidelity mockups, and building interactive prototypes. The course is project-based, and you will build a complete mobile app design from scratch.',
    instructor: {
      name: 'Liam Chen',
      title: 'Principal Product Designer',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'abstract design',
    category: 'Design',
    modules: [
      {
        id: 'm3',
        title: 'Module 1: Design Fundamentals',
        lessons: [
          { id: 'l3_1', title: 'Principles of Visual Design', type: 'article', duration: 20, content: 'Explore the core principles of visual design, including hierarchy, contrast, repetition, proximity, and white space. Understanding these principles is essential for creating user interfaces that are both beautiful and functional. This article includes examples from popular apps and websites.' },
          { id: 'l3_2', title: 'Getting Started with Figma', type: 'video', duration: 35, content: 'A hands-on introduction to the Figma interface. We will cover the essential tools, such as frames, shapes, text, and auto layout. By the end of this lesson, you will be comfortable navigating Figma and creating basic design elements for your projects.' },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Digital Marketing Essentials',
    description: 'Learn SEO, SEM, and social media marketing to grow any business online.',
    longDescription: 'Unlock the secrets to successful online marketing. This course covers the three pillars of digital marketing: Search Engine Optimization (SEO), Search Engine Marketing (SEM), and Social Media Marketing. You will learn practical strategies to improve website rankings, run effective ad campaigns on Google and social platforms, and build an engaged online community.',
    instructor: {
      name: 'Aisha Khan',
      title: 'Digital Marketing Strategist',
      avatar: 'https://placehold.co/100x100.png',
    },
    image: 'https://placehold.co/600x400.png',
    'data-ai-hint': 'data visualization',
    category: 'Marketing',
    modules: [
        {
          id: 'm4',
          title: 'Module 1: Introduction to SEO',
          lessons: [
            { id: 'l4_1', title: 'How Search Engines Work', type: 'article', duration: 15, content: 'This lesson demystifies search engines like Google. We will learn about crawling, indexing, and ranking, the three key stages that determine which websites appear at the top of search results. This foundational knowledge is crucial for any effective SEO strategy.' },
            { id: 'l4_2', title: 'On-Page SEO Techniques', type: 'video', duration: 40, content: 'Learn how to optimize your website\'s content and HTML source code to rank higher. This video covers keyword research, writing effective title tags and meta descriptions, optimizing images, and creating user-friendly content. We will perform a live audit of a website and implement these techniques.' },
        ],
      },
    ]
  },
];

export const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
}

export const getLessonByIds = (courseId: string, lessonId: string) => {
    const course = getCourseById(courseId);
    if (!course) return null;
    for (const module of course.modules) {
        const lesson = module.lessons.find(lesson => lesson.id === lessonId);
        if (lesson) return { course, lesson };
    }
    return null;
}
