'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Rewind,
  FastForward,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  imageUrl: string;
  imageAiHint?: string;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds === Infinity) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  ({ className, src, imageUrl, imageAiHint, ...props }, ref) => {
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
        className={cn('w-full overflow-hidden p-4 md:p-6 bg-card/80 backdrop-blur-lg border-white/10 select-none shadow-lg shadow-primary/10', className)}
        {...props}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
            <div className="md:col-span-1">
                 <div className="relative aspect-square md:aspect-auto md:h-full w-full overflow-hidden rounded-md group cursor-pointer" onClick={togglePlayPause}>
                    <Image
                      src={imageUrl}
                      alt="Capa do áudio"
                      fill
                      className="object-cover"
                      data-ai-hint={imageAiHint}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {isPlaying ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 text-white" />}
                    </div>
                </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-center">
                <div className="mb-2 text-center md:text-left">
                    <h3 className="font-bold text-lg md:text-xl text-foreground truncate">Continue a Conversa</h3>
                    <p className="text-muted-foreground text-sm">Aperte o play para ouvir o confronto de ideias por trás deste conteúdo.</p>
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

                 <div className="mt-3 flex justify-center items-center gap-4">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground">
                        <Rewind className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-16 w-16 bg-primary/10 hover:bg-primary/20 rounded-full" onClick={togglePlayPause}>
                        {isPlaying ? <Pause className="h-8 w-8 text-primary" /> : <Play className="h-8 w-8 text-primary pl-1" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground">
                        <FastForward className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
        
        <audio ref={audioRef} src={src} className="hidden" preload="metadata" />
      </Card>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

export { AudioPlayer };
