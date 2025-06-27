import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6 flex justify-center items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">{post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.isoDate}>{post.date}</time>
        </div>
      </header>

      <div className="relative mb-8 h-64 md:h-96 w-full overflow-hidden rounded-xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          data-ai-hint={post['data-ai-hint']}
          priority
        />
      </div>
      
      <Separator className="my-8" />

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return <h2 key={index} className="font-headline text-2xl font-bold mt-8 mb-4">{paragraph.replaceAll('**', '')}</h2>;
          }
          return <p key={index}>{paragraph}</p>;
        })}
      </div>
    </article>
  );
}
