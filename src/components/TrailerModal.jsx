import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, X, Maximize2, Volume2, VolumeX } from 'lucide-react';

const TrailerModal = ({
  trailerKey,
  open,
  onClose,
  movieTitle = 'Bande-annonce',
}) => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    if (open && trailerKey) {
      setLoading(true);
      setIsFullscreen(false);
      setEmbedUrl(
        `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
          isMuted ? 1 : 0
        }&modestbranding=1&rel=0`
      );
    }
  }, [open, trailerKey, isMuted]);

  const toggleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setEmbedUrl(
      `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${
        !isMuted ? 1 : 0
      }&modestbranding=1&rel=0`
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose} className='trailer-dialog'>
      <DialogContent className='sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-4xl xl:max-w-5xl bg-gray-900/95 backdrop-blur-sm border-gray-700/50 shadow-2xl p-1 sm:p-2 md:p-4'>
        <DialogHeader className='mb-0 pb-0'>
          <div className='absolute right-1 top-1 z-10 flex gap-1 sm:gap-2 sm:right-2 sm:top-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleMute}
              className='h-7 w-7 sm:h-8 sm:w-8 bg-black/50 hover:bg-black/70 rounded-full'
            >
              {isMuted ? (
                <VolumeX className='h-3 w-3 sm:h-4 sm:w-4 text-white' />
              ) : (
                <Volume2 className='h-3 w-3 sm:h-4 sm:w-4 text-white' />
              )}
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={toggleFullscreen}
              className='h-7 w-7 sm:h-8 sm:w-8 bg-black/50 hover:bg-black/70 rounded-full'
            >
              <Maximize2 className='h-3 w-3 sm:h-4 sm:w-4 text-white' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={onClose}
              className='h-7 w-7 sm:h-8 sm:w-8 bg-black/50 hover:bg-black/70 rounded-full'
            >
              <X className='h-3 w-3 sm:h-4 sm:w-4 text-white' />
            </Button>
          </div>
        </DialogHeader>

        <div className='relative aspect-video rounded-lg overflow-hidden w-full mt-0'>
          {loading && (
            <div className='absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-10'>
              <Loader2 className='h-8 w-8 animate-spin text-white mb-2' />
              <p className='text-white text-sm sm:text-base'>
                Chargement de la bande-annonce...
              </p>
            </div>
          )}

          <iframe
            className={`w-full h-full ${
              loading ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}
            src={embedUrl}
            title={`${movieTitle} - Bande-annonce`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
            allowFullScreen
            onLoad={() => setLoading(false)}
          />
        </div>

        <div className='text-center text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2'>
          {movieTitle} - Bande-annonce
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrailerModal;
