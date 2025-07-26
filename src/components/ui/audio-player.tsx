
'use client';

import * as React from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface AudioPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playbackRate: number;
  onPlayPause: () => void;
  onSliderChange: (value: number[]) => void;
  onRateChange: (rate: number) => void;
  title?: string;
  description?: string;
  variant?: 'default' | 'fixed';
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds) || seconds === Infinity) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const playbackRates = [0.75, 1, 1.25, 1.5, 2];

const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
      className,
      isPlaying,
      duration,
      currentTime,
      playbackRate,
      onPlayPause,
      onSliderChange,
      onRateChange,
      title,
      description,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    const handleRateChange = (rate: number) => {
      onRateChange(rate);
      setIsPopoverOpen(false);
    };

    const remainingTime = duration - currentTime;

    const containerClasses = cn(
      'w-full overflow-hidden bg-card/80 backdrop-blur-lg border-white/10 select-none group',
      variant === 'default' && 'rounded-lg p-4 shadow-lg',
      variant === 'fixed' && 'border-t p-3 container mx-auto',
      className
    );

    return (
      <Card ref={ref} className={containerClasses} {...props}>
        <div className="flex items-center gap-4 md:gap-6">
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 flex-shrink-0 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-primary-foreground" />
            ) : (
              <Play className="h-6 w-6 pl-1 text-primary-foreground" />
            )}
          </Button>

          <div className="flex-grow flex flex-col gap-1 overflow-hidden">
            <div>
              <h3 className="font-bold text-foreground truncate text-sm">
                {title || 'Continue a Conversa'}
              </h3>
              <p className="text-muted-foreground text-xs truncate">
                {description || 'Aperte o play para ouvir o confronto de ideias.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono min-w-[4ch] text-right opacity-0 group-hover:opacity-100 transition-opacity">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 1}
                step={0.1}
                onValueChange={onSliderChange}
                className="w-full"
              />
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-muted-foreground font-mono min-w-[5ch] text-left">
                  -{formatTime(remainingTime)}
                </span>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-16 font-mono text-xs text-muted-foreground"
                    >
                      {playbackRate}x
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-1 mb-2">
                    <div className="flex flex-col gap-1">
                      {playbackRates.map((rate) => (
                        <Button
                          key={rate}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRateChange(rate)}
                          className={cn(
                            'w-full justify-center',
                            playbackRate === rate && 'bg-primary/20 text-primary'
                          )}
                        >
                          {rate}x
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
);

AudioPlayer.displayName = 'AudioPlayer';

export { AudioPlayer };
