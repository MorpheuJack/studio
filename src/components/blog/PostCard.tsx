import Image from 'next/image';
import Link from 'next/link';
import type { Post } from '@/lib/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-[0_10px_25px_-5px_hsl(var(--primary)/0.2),0_8px_10px_-6px_hsl(var(--primary)/0.2)] hover:-translate-y-1 border-border hover:border-primary/30">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-6 text-center">
          <h3 className="font-headline text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.description}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author}</p>
              <p className="text-xs text-muted-foreground">{post.date}</p>
            </div>
          </div>
          <Button variant="link" className="p-0 text-primary">Ler mais &rarr;</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
