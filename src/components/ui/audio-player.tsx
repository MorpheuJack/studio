'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Star,
  MoreHorizontal,
  ListMusic,
  MessageSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  imageUrl: string;
  imageAiHint?: string;
  title: string;
  artist: string;
  album: string;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds === Infinity) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  ({ className, src, imageUrl, imageAiHint, title, artist, album, ...props }, ref) => {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);

    const togglePlayPause = () => {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    };
    
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, [role=slider]')) {
        return;
      }
      togglePlayPause();
    }
    
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            if (audio.duration !== Infinity) {
                setDuration(audio.duration);
            }
            setCurrentTime(audio.currentTime);
        };
        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadedmetadata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));
        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });

        if (audio.readyState > 0 && audio.duration !== Infinity) {
            setDuration(audio.duration);
        }

        return () => {
            audio.removeEventListener('loadedmetadata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('play', () => setIsPlaying(true));
            audio.removeEventListener('pause', () => setIsPlaying(false));
            audio.removeEventListener('ended', () => {
              setIsPlaying(false);
              setCurrentTime(0);
            });
        };
    }, [src]);

    const handleSliderChange = (value: number[]) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value[0];
        setCurrentTime(value[0]);
      }
    };

    const remainingTime = duration - currentTime;

    return (
      <Card
        ref={ref}
        className={cn('w-full max-w-md overflow-hidden p-4 bg-card/80 backdrop-blur-lg border-white/10 select-none', className)}
        {...props}
      >
        <div className="flex items-start gap-4 cursor-pointer" onClick={handleCardClick}>
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md group">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              data-ai-hint={imageAiHint}
            />
             <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
            </div>
          </div>
          <div className="flex-1 pt-1">
            <h3 className="font-bold text-lg text-foreground truncate">{title}</h3>
            <p className="text-muted-foreground text-sm">{artist}</p>
            <p className="text-muted-foreground/70 text-sm">{album}</p>
          </div>
        </div>
        
        <div className="mt-2 flex items-center gap-4">
           <svg width="24" height="24" viewBox="0 0 42 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-4 text-muted-foreground">
                <path d="M2.203 5.344v13.062h1.688V5.344H2.203zM10.125 5.344v13.062h1.688V5.344h-1.688zM6.094 5.344c-.75 0-1.39.14-1.922.422v1.515c.469-.328.985-.492 1.547-.492.657 0 1.172.203 1.547.609.375.407.563.985.563 1.735v7.593h1.687V8.984c0-1.125-.344-2-1.031-2.625-.688-.625-1.594-.937-2.719-.937zm8.344 0c-1.125 0-2.031.312-2.719.937-.687.625-1.031 1.5-1.031 2.625v7.594h1.688V8.984c0-.75.188-1.328.563-1.734.375-.406.89-.61 1.547-.61.562 0 1.078.164 1.547.492V5.766c-.532-.282-1.172-.422-1.922-.422zm10.047 0c-.75 0-1.39.14-1.922.422v1.515c.469-.328.984-.492 1.547-.492.656 0 1.172.203 1.547.609.375.407.562.985.562 1.735v7.593h1.688V8.984c0-1.125-.344-2-1.031-2.625-.688-.625-1.594-.937-2.719-.937zm8.344 0c-1.125 0-2.031.312-2.719.937-.687.625-1.031 1.5-1.031 2.625v7.594h1.688V8.984c0-.75.188-1.328.562-1.734.375-.406.89-.61 1.547-.61.563 0 1.078.164 1.547.492V5.766c-.531-.282-1.172-.422-1.922-.422zm-2.016 7.031c0 .844.25 1.531.75 2.063.5.53.984.797 1.453.797.47 0 .953-.265 1.453-.797.5-.532.75-1.22.75-2.063v-1.593c0-.844-.25-1.532-.75-2.063-.5-.531-.984-.797-1.453-.797-.47 0-.953.266-1.453.797-.5.531-.75 1.22-.75 2.063v1.593zm-8.344 0c0 .844.25 1.531.75 2.063.5.53.984.797 1.453.797.469 0 .953-.265 1.453-.797.5-.532.75-1.22.75-2.063v-1.593c0-.844-.25-1.532-.75-2.063-.5-.531-.984-.797-1.453-.797-.469 0-.953.266-1.453.797-.5.531-.75 1.22-.75 2.063v1.593zM2.844 2.11C1.297 2.11 0 3.375 0 4.969v13.812C0 20.375 1.297 21.64 2.844 21.64h10.531c1.547 0 2.844-1.265 2.844-2.859V4.97C16.219 3.375 14.922 2.11 13.375 2.11H2.844zM1.688 4.969c0-.656.531-1.188 1.156-1.188h10.531c.625 0 1.156.532 1.156 1.188v13.812c0 .657-.531 1.188-1.156 1.188H2.844c-.625 0-1.156-.531-1.156-1.188V4.97zM28.438 2.11c-1.547 0-2.844 1.265-2.844 2.859v13.812c0 1.594 1.297 2.859 2.844 2.859h10.531c1.547 0 2.844-1.265 2.844-2.859V4.97C41.812 3.375 40.516 2.11 38.969 2.11h-10.53zM27.125 4.97c0-.657.531-1.188 1.156-1.188h10.531c.625 0 1.156.532 1.156 1.188v13.812c0 .657-.531 1.188-1.156 1.188H28.28c-.625 0-1.156-.531-1.156-1.188V4.97z" fill="currentColor"></path>
           </svg>
           <div className="flex-1 flex justify-end items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7"><Star className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-5 w-5" /></Button>
            </div>
        </div>

        <div className="mt-2 space-y-1">
            <Slider
                value={[currentTime]}
                max={duration || 1}
                step={0.1}
                onValueChange={handleSliderChange}
                className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(remainingTime)}</span>
            </div>
        </div>
        
        <audio ref={audioRef} src={src} className="hidden" preload="metadata" />

        <div className="mt-2 flex justify-between items-center text-muted-foreground">
             <div>{/* Placeholder for device name */}</div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-7 w-7"><MessageSquare className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><ListMusic className="h-5 w-5" /></Button>
            </div>
        </div>
      </Card>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

export { AudioPlayer };
